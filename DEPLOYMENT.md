# Guía de Despliegue y Configuración

## 1. Estructura de Carpetas & Root Directory (Monorepo)

Dado que es un monorepo, debes configurar los "Root Directories" en Vercel y Railway para que sepan dónde construir el proyecto.

### **Frontend (Vercel)**
Al importar el repositorio en Vercel:
- **Framework Preset**: Next.js
- **Root Directory**: `apps/web`
  - Vercel navegará a esta carpeta antes de correr `npm install` y `npm run build`.
- **Build Command**: (Default) `next build`
- **Output Directory**: (Default) `.next`

### **Backend (Railway)**
Al crear el servicio en Railway desde GitHub:
- Ve a **Settings > General > Root Directory**.
- Configúralo como: `/apps/api`
- Railway buscará el `Dockerfile` dentro de esa carpeta y construirá la imagen automáticamente.
- **Variable de Entorno (PORT)**: El Dockerfile expone el 8000, pero Railway asigna puertos dinámicos a veces. Asegúrate de que tu `main.py` usa `PORT` env var o deja que Railway maneje el mapeo interno del 8000. (Nuestro Dockerfile usa fijo 8000, Railway mapeará tráfico externo a ese puerto si se detecta).

---

## 2. Configuración DNS (Hostinger)

Para que tu frontend responda en `cv.raido.com.co` con SSL, debes configurar un registro CNAME en Hostinger que apunte a Vercel.

1. Entra a tu panel de **Hostinger > DNS Zone Editor** para `raido.com.co`.
2. Crea/Añade el siguiente registro:

| Tipo  | Nombre (Name) | Valor (Target/Content) | TTL  |
|-------|---------------|------------------------|------|
| **CNAME** | `cv`          | `cname.vercel-dns.com` | 3600 |

**Nota**: 
- `cv` es el subdominio. El dominio completo será `cv.raido.com.co`.
- Una vez añadido en Hostinger, ve a tu proyecto en **Vercel > Settings > Domains**.
- Añade el dominio `cv.raido.com.co`. Vercel verificará el registro CNAME y generará automáticamente el certificado SSL (HTTPS).

---

## 3. Variables de Entorno Recomendadas

**Backend (Railway Variables)**:
- `ALLOWED_ORIGINS`: `https://cv.raido.com.co` (para CORS estricto en producción)

**Frontend (Vercel Environment Variables)**:
- `NEXT_PUBLIC_API_URL`: `https://<tu-proyecto-en-railway>.up.railway.app` (para que el front sepa a dónde pegar).

---

## Resumen de Arquitectura
- **Frontend**: Renderizado en Vercel Edge Network.
- **Backend**: Container corriendo en Railway.
- **Database**: (Planeado) Supabase conectado al Backend via Connection String.
