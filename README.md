# 🚀 cvOS: El Sistema Operativo para tu Carrera

Bienvenido a **cvOS**. Si estás buscando trabajo y sientes que los robots (ATS) te descartan injustamente, esta herramienta es para ti.

**cvOS** te ayuda a analizar tu CV, mejorarlo con Inteligencia Artificial (Google Gemini) y generar un PDF perfecto que los reclutadores amarán.

---

## ✨ ¿Qué hace este proyecto?

Este sistema tiene 4 funciones principales:

1.  **🔍 ATS Checker ("El Juez")**:
    - Subes tu CV actual (PDF).
    - Te dice qué porcentaje de compatibilidad tiene con los sistemas de reclutamiento.
    - Te avisa si te faltan secciones claves como "Experiencia" o "Contacto".

2.  **🧠 Modo IA Premium ("El Consultor")**:
    - Usa **Inteligencia Artificial** (Google Gemini) para leer tu hoja de vida a profundidad.
    - Te dice tus **puntos fuertes** (para que los resaltes).
    - Te dice tus **debilidades** (para que las corrijas).

3.  **📄 Generador de PDF ("El Artista")**:
    - Crea un CV nuevo y limpio desde cero.
    - Usa un diseño "Harvard Style" (minimalista) que es el estándar de oro para pasar filtros.

4.  **📊 Dashboard**:
    - Tu centro de mando para guardar tu experiencia y skills y no tener que escribirlas mil veces.

---

## 🏗️ ¿Cómo está construido? ("Para Techies")

Esto es un **Monorepo** (una gran carpeta con todo el código junto).

- **La cara bonita (Frontend)**: Está en la carpeta `apps/web`.
  - Usa **Next.js** (React) modernísimo.
  - Diseño con **TailwindCSS** (se ve bien en móvil y PC).
  - Se despliega fácil en **Vercel**.

- **El cerebro (Backend)**: Está en la carpeta `apps/api`.
  - Usa **Python** con **FastAPI** (rápido y eficiente).
  - Usa **WeasyPrint** para dibujar los PDFs.
  - Se despliega fácil en **Railway**.

---

## 🚦 ¿Cómo lo uso en mi computadora?

Si quieres probarlo o modificarlo en tu PC, sigue estos pasos:

### 1. Requisitos previos
Necesitas tener instalado:
- [Git](https://git-scm.com/) (para bajar el código)
- [Python 3.11](https://www.python.org/) (para el cerebro)
- [Node.js](https://nodejs.org/) (para la cara bonita)

### 2. Descargar el código
```bash
git clone https://github.com/Raido-co/cvos-platform.git
cd cvos-platform
```

### 3. Encender el Cerebro (Backend)
Abre una terminal y corre:
```bash
cd apps/api
pip install -r requirements.txt
# IMPORTANTE: Necesitas una Google API Key para la IA
export GOOGLE_API_KEY="tu_clave_secreta_aqui"
uvicorn main:app --reload
```
*El backend quedará corriendo en http://localhost:8000*

### 4. Encender la Cara Bonita (Frontend)
Abre **otra** terminal y corre:
```bash
cd apps/web
npm install
npm run dev
```
*Abre tu navegador en http://localhost:3000 y ¡listo!*

---

## ☁️ ¿Cómo lo subo a Internet?

Hemos preparado una guía paso a paso (súper detallada) para que lo tengas online en minutos usando servicios mayormente gratuitos.

👉 **[Leer la Guía de Despliegue (DEPLOYMENT.md)](./DEPLOYMENT.md)**

---

## 🏛️ Sobre el Proyecto
Desarrollado con ❤️ por la organización **Raido**.
*Bootstrap your career.*
