import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            print("WARNING: GOOGLE_API_KEY not found. AI features will fail.")
            self.model = None
        else:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-pro')

    def analyze_cv(self, text: str):
        if not self.model:
            return {"error": "AI Service not configured (missing API Key)"}

        prompt = f"""
        Actúa como un experto reclutador y sistema ATS avanzado. Analiza el siguiente texto extraído de un CV y dame un reporte estructurado en formato JSON con los siguientes campos:
        1. "score": Un puntaje numérico de 0 a 100 basado en completitud y palabras clave.
        2. "summary": Un resumen profesional de 2 líneas del candidato.
        3. "strengths": Lista de 3 fortalezas clave detectadas.
        4. "weaknesses": Lista de 3 áreas de mejora o secciones faltantes.
        5. "keywords_detected": Lista de habilidades técnicas o blandas encontradas.

        CV TEXT:
        {text[:8000]} 
        """
        # Truncamos a 8000 chars por si acaso, aunque Gemini soporta más.

        try:
            response = self.model.generate_content(prompt)
            # Intentar limpiar el resultado para obtener JSON puro si el modelo devuelve markdown
            cleaned_text = response.text.replace("```json", "").replace("```", "").strip()
            return cleaned_text
        except Exception as e:
            return {"error": str(e)}
