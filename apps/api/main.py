from fastapi import FastAPI, UploadFile, File, HTTPException
from ats_checker import ATSAnalyzer
from ai_service import AIService
from fastapi.middleware.cors import CORSMiddleware
import shutil
import json
import os

app = FastAPI(title="cvOS API", version="1.0.0")

# Configurar CORS para permitir peticiones desde el frontend (Vercel)
origins = [
    "http://localhost:3000",
    "https://cv.raido.com.co",  # Production Domain
    "https://cv-raido.com.co",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "service": "cvOS Backend"}

@app.post("/analyze")
async def analyze_cv(file: UploadFile = File(...)):
    """
    Endpoint para subir un PDF y recibir el análisis ATS.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")

    # Guardar temporalmente el archivo para procesarlo
    temp_filename = f"temp_{file.filename}"
    with open(temp_filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        analyzer = ATSAnalyzer(temp_filename)
        # Análisis básico
        basic_result = analyzer.analyze()
        return basic_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

@app.post("/analyze-with-ai")
async def analyze_cv_ai(file: UploadFile = File(...)):
    """
    Endpoint Premium: Sube un PDF y usa IA para un análisis profundo.
    """
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")

    temp_filename = f"temp_ai_{file.filename}"
    with open(temp_filename, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # 1. Extraer texto usando el ATSAnalyzer existente
        analyzer = ATSAnalyzer(temp_filename)
        text = analyzer._extract_text()
        
        # 2. Enviar a Gemini AI
        ai_service = AIService()
        ai_result_str = ai_service.analyze_cv(text)
        
        # 3. Parsear respuesta (asumiendo que Gemini devuelve JSON string válido)
        try:
            if isinstance(ai_result_str, dict) and "error" in ai_result_str:
                 return ai_result_str # Retornar error directo
            
            ai_data = json.loads(ai_result_str)
            return ai_data
        except json.JSONDecodeError:
            # Fallback si no es JSON válido
            return {
                "score": analyzer.analyze().get("score", 0),
                "summary": "La IA generó un reporte no estructurado.",
                "raw_analysis": ai_result_str
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
