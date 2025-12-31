import fitz  # PyMuPDF
import re
from typing import List, Dict, Any

class ATSAnalyzer:
    def __init__(self, pdf_path: str):
        self.pdf_path = pdf_path
        self.text = self._extract_text()
        self.sections_found: List[str] = []
        self.issues: List[str] = []
        self.improvements: List[str] = []
        self.strengths: List[str] = []
        self.score = 0

    def _extract_text(self) -> str:
        """Extrae todo el texto del PDF."""
        doc = fitz.open(self.pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        return text

    def analyze(self) -> Dict[str, Any]:
        """Ejecuta el análisis completo y retorna resultados detallados."""
        metrics = self._calculate_metrics()
        self._check_sections()
        self._analyze_structure(metrics)
        self._generate_feedback(metrics)
        
        return {
            "score": self.score,
            "sections_found": self.sections_found,
            "metrics": metrics,
            "issues": self.issues,
            "improvements": self.improvements,
            "strengths": self.strengths,
            "summary": self._generate_summary()
        }

    def _calculate_metrics(self) -> Dict[str, Any]:
        """Calcula métricas detalladas del documento."""
        lines = self.text.split('\n')
        words = self.text.split()
        
        # Detectar viñetas/bullets
        bullet_patterns = [r'^[\•\-\*\→\►\▸]', r'^\d+\.', r'^[a-z]\)', r'^[ivx]+\.']
        bullet_lines = 0
        for line in lines:
            line_stripped = line.strip()
            for pattern in bullet_patterns:
                if re.match(pattern, line_stripped, re.IGNORECASE):
                    bullet_lines += 1
                    break
        
        # Detectar posibles columnas (líneas muy cortas seguidas)
        short_lines = sum(1 for line in lines if 0 < len(line.strip()) < 30)
        possible_columns = short_lines > len(lines) * 0.4
        
        # Detectar tablas (muchas tabulaciones o pipes)
        table_indicators = self.text.count('\t') + self.text.count('|')
        possible_tables = table_indicators > 20
        
        # Calcular legibilidad simple (proporción de palabras comunes)
        avg_word_length = sum(len(w) for w in words) / max(len(words), 1)
        readability = max(0, min(100, 100 - (avg_word_length - 5) * 10))
        
        # Verificar si hay suficiente contenido
        has_enough_content = len(words) >= 200
        
        return {
            "word_count": len(words),
            "line_count": len([l for l in lines if l.strip()]),
            "bullet_count": bullet_lines,
            "has_columns": possible_columns,
            "has_tables": possible_tables,
            "readability_score": round(readability),
            "avg_word_length": round(avg_word_length, 1),
            "has_enough_content": has_enough_content,
            "page_count": self._get_page_count()
        }

    def _get_page_count(self) -> int:
        """Obtiene el número de páginas del PDF."""
        try:
            doc = fitz.open(self.pdf_path)
            count = len(doc)
            doc.close()
            return count
        except:
            return 1

    def _check_sections(self):
        """Detecta secciones estándar buscando palabras clave."""
        section_keywords = {
            "Experiencia Laboral": ["experiencia", "experience", "work history", "employment", "trabajo"],
            "Educación": ["educación", "education", "formación", "academic", "university", "universidad", "estudios"],
            "Habilidades/Skills": ["habilidades", "skills", "competencias", "technologies", "tecnologías", "conocimientos"],
            "Resumen/Perfil": ["perfil", "profile", "resumen", "summary", "about me", "sobre mí", "objetivo"],
            "Contacto": ["contacto", "contact", "email", "teléfono", "phone", "linkedin", "github"]
        }

        text_lower = self.text.lower()
        found_count = 0
        total_sections = len(section_keywords)

        for section, keywords in section_keywords.items():
            for kw in keywords:
                if kw in text_lower:
                    self.sections_found.append(section)
                    found_count += 1
                    break
        
        # Score por secciones (40% del total)
        section_score = (found_count / total_sections) * 40
        self.score += round(section_score)

    def _analyze_structure(self, metrics: Dict[str, Any]):
        """Analiza la estructura y añade puntos al score."""
        # Legibilidad (30% del total)
        readability_score = (metrics["readability_score"] / 100) * 30
        self.score += round(readability_score)
        
        # Bullets (15% del total) - más bullets = mejor estructura
        if metrics["bullet_count"] >= 10:
            self.score += 15
        elif metrics["bullet_count"] >= 5:
            self.score += 10
        elif metrics["bullet_count"] > 0:
            self.score += 5
        
        # Penalizaciones
        if metrics["has_columns"]:
            self.score -= 5
        if metrics["has_tables"]:
            self.score -= 5
        if not metrics["has_enough_content"]:
            self.score -= 10
        
        # Bonus por contenido adecuado (15% del total)
        if 300 <= metrics["word_count"] <= 800:
            self.score += 15
        elif metrics["word_count"] > 800:
            self.score += 10
        elif metrics["word_count"] >= 200:
            self.score += 5
        
        # Limitar score entre 0 y 100
        self.score = max(0, min(100, self.score))

    def _generate_feedback(self, metrics: Dict[str, Any]):
        """Genera feedback específico basado en el análisis."""
        # ISSUES (Qué revisar)
        if metrics["has_columns"]:
            self.issues.append("Se detectaron posibles columnas. Algunos ATS tienen problemas leyendo layouts multi-columna.")
        if metrics["has_tables"]:
            self.issues.append("Se detectaron indicadores de tablas. Las tablas pueden confundir a los ATS.")
        if not metrics["has_enough_content"]:
            self.issues.append("El CV parece muy corto. Considera añadir más detalles sobre tus logros.")
        if len(self.sections_found) < 4:
            missing = 5 - len(self.sections_found)
            self.issues.append(f"Faltan {missing} secciones clave. Asegúrate de incluir: Experiencia, Educación, Habilidades.")
        
        if not self.issues:
            self.issues.append("No detectamos problemas críticos en este documento.")
        
        # IMPROVEMENTS (Cómo mejorarlo)
        if metrics["bullet_count"] < 10:
            self.improvements.append("Usa más viñetas (•) para listar logros. Los ATS y reclutadores las prefieren.")
        if metrics["word_count"] < 300:
            self.improvements.append("Expande tu contenido. Un CV de 1-2 páginas con 400-700 palabras es ideal.")
        if metrics["word_count"] > 1000:
            self.improvements.append("Considera condensar. CVs muy largos pueden perder la atención del reclutador.")
        if metrics["readability_score"] < 70:
            self.improvements.append("Simplifica tu lenguaje. Oraciones más cortas y palabras más simples mejoran la legibilidad.")
        
        if not self.improvements:
            self.improvements.append("Buen equilibrio entre detalle y síntesis. Mantén los logros cuantificables al inicio de cada sección.")
        
        # STRENGTHS (Lo que está bien)
        if metrics["word_count"] >= 300 and metrics["word_count"] <= 800:
            self.strengths.append(f"La extensión ({metrics['word_count']} palabras) está dentro del rango ideal para filtros ATS.")
        if len(self.sections_found) >= 4:
            self.strengths.append(f"{len(self.sections_found)} de 5 secciones clave detectadas.")
        if metrics["bullet_count"] >= 10:
            self.strengths.append(f"{metrics['bullet_count']} líneas con viñetas identificadas.")
        if not metrics["has_columns"]:
            self.strengths.append("Sin indicios de columnas complejas.")
        if not metrics["has_tables"]:
            self.strengths.append("Sin señales de tablas complejas.")
        if metrics["readability_score"] >= 70:
            self.strengths.append(f"Legibilidad general estimada: {metrics['readability_score']}/100.")
        
        if not self.strengths:
            self.strengths.append("Documento procesado correctamente.")

    def _generate_summary(self) -> str:
        """Genera un resumen general basado en el score."""
        if self.score >= 85:
            return "Excelente compatibilidad ATS. Tu CV tiene una estructura clara y profesional."
        elif self.score >= 70:
            return "Buena compatibilidad. Pequeños ajustes pueden mejorar tus posibilidades."
        elif self.score >= 50:
            return "Compatibilidad moderada. Revisa las sugerencias para mejorar tu CV."
        else:
            return "Baja compatibilidad. Considera reformatear tu CV siguiendo las recomendaciones."
