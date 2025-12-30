import fitz  # PyMuPDF
import re

class ATSAnalyzer:
    def __init__(self, pdf_path):
        self.pdf_path = pdf_path
        self.text = self._extract_text()
        self.sections_found = []
        self.score = 0

    def _extract_text(self):
        """Extrae todo el texto del PDF."""
        doc = fitz.open(self.pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text

    def analyze(self):
        """Ejecuta el análisis completo."""
        self._check_sections()
        self._calculate_readability() # Placeholder para futura lógica simple
        
        return {
            "score": self.score,
            "sections_found": self.sections_found,
            "text_length": len(self.text),
            "summary": self._generate_summary()
        }

    def _check_sections(self):
        """
        Detecta secciones estándar buscando palabras clave.
        Esto es heurístico pero efectivo para un MVP.
        """
        # Definir keywords para secciones comunes (Español e Inglés)
        section_keywords = {
            "Experiencia Laboral": ["experiencia", "experience", "work history", "employment"],
            "Educación": ["educación", "education", "formación", "academic", "university", "universidad"],
            "Habilidades/Skills": ["habilidades", "skills", "competencias", "technologies", "tecnologías"],
            "Resumen/Perfil": ["perfil", "profile", "resumen", "summary", "about me", "sobre mí"],
            "Contacto": ["contacto", "contact", "email", "teléfono", "phone"]
        }

        # Normalizar texto para búsqueda
        text_lower = self.text.lower()
        
        found_count = 0
        total_sections = len(section_keywords)

        for section, keywords in section_keywords.items():
            found = False
            for kw in keywords:
                # Buscamos la palabra clave como un título o encabezado aproximado
                # O simplemente presencia en el documento para MVP
                if kw in text_lower:
                    found = True
                    break
            
            if found:
                self.sections_found.append(section)
                found_count += 1
        
        # Calcular score basado en secciones encontradas (peso 60% del score total)
        section_score = (found_count / total_sections) * 60
        self.score += round(section_score)

    def _calculate_readability(self):
        """
        Lógica simple para verificar si el PDF es legible por máquina.
        Si extrajimos muy poco texto de un PDF con muchas páginas, podría ser una imagen.
        """
        if len(self.text) > 100:
            # Asumimos que es legible (peso 40% del score total)
            self.score += 40
        else:
            # Penalización fuerte si no se puede leer texto
            pass

    def _generate_summary(self):
        if self.score >= 80:
            return "Excelente compatibilidad ATS. Estructura clara."
        elif self.score >= 50:
            return "Buen inicio, pero faltan secciones clave o contenido legible."
        else:
            return "Baja compatibilidad. Asegúrate de usar texto seleccionable, no imágenes."
