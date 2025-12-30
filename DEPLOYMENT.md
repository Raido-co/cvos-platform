# Guía Definitiva de Despliegue (cvOS)

## A. GitHub y Organización
**Recomendación**: Sube este proyecto a tu organización **Raido**.
- Proyectos profesionales o "SaaS" se ven mejor bajo una organización.
- Facilita la gestión de permisos en Vercel/Railway si luego invitas colaboradores.

### Pasos para subir a GitHub
1. Ve a GitHub y crea un **Nuevo Repositorio** (ej: `cvos-platform`) dentro de la organización **Raido**.
2. No añadas README ni .gitignore (ya los tenemos).
3. Corre estos comandos en tu terminal (en la carpeta del proyecto):
   ```bash
   # Ya hemos inicializado git por ti. Solo falta conectar al remote.
   # Si ya agregaste un remote antes, primero elimínalo: git remote remove origin
   git remote add origin https://github.com/Raido/cvos-platform.git
   git branch -M main
   git push -u origin main
   ```

---

## B. Despliegue Frontend (Vercel) - Paso a Paso

1. **Crear Cuenta**: Entra a [vercel.com](https://vercel.com) y loguéate con **GitHub**.
2. **Nuevo Proyecto**: Click en "Add New..." > "Project".
3. **Importar**: Verás una lista de tus repositorios. Busca `Raido/cvos-platform` y dale **Import**.
4. **Configurar Framework**:
   - Vercel detectará "Next.js".
   - **IMPORTANTE**: Edita el **Root Directory**.
     - Click en "Edit" al lado de Root Directory.
     - Selecciona `apps/web`.
5. **Variables de Entorno**:
   - Despliega la sección "Environment Variables".
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://<tu-proyecto-railway>.up.railway.app` cvos-platform-production.up.railway.app (Esto lo obtendrás en el paso C).
6. **Deploy**: Click en "Deploy".

---

## C. Despliegue Backend (Railway) - Paso a Paso

1. **Crear Cuenta**: Entra a [railway.app](https://railway.app) y loguéate con **GitHub**.
2. **Nuevo Proyecto**: Click en "New Project" > "Deploy from GitHub repo".
3. **Seleccionar Repo**: Elige `Raido/cvos-platform`.
4. **Configuración Inicial**:
   - Railway intentará construir todo. Probablemente falle al principio porque necesita saber dónde está el Dockerfile.
   - Click en el servicio (caja rectangular) que se creó.
   - Ve a **Settings**.
   - Busca **"Root Directory"** y escribe: `/apps/api`
5. **Variables**:
   - Ve a la pestaña **Variables**.
   - Añade `GOOGLE_API_KEY`: Pega tu llave de Google AI aquí.
   - Añade `ALLOWED_ORIGINS`: `https://cvos.raido.com.co` (o el dominio que te de Vercel temporalmente).
6. **Generar Dominio**:
   - Ve a la pestaña **Settings** > **Networking**.
   - Click en "Generate Domain".
   - Copia este dominio y actualiza la variable en Vercel.

---

## D. Configuración DNS (Hostinger)

Para que tu frontend responda en `cvos.raido.com.co`:

1. Entra a tu panel de **Hostinger > DNS Zone Editor** para `raido.com.co`.
2. Crea un registro **CNAME**:
   - **Name**: `cvos`
   - **Target**: `cname.vercel-dns.com`
   - **TTL**: 3600
3. En **Vercel > Settings > Domains**, añade `cvos.raido.com.co`.

---

## E. CI/CD (GitHub Actions)
Hemos creado un archivo `.github/workflows/ci.yml`. GitHub ejecutará pruebas automáticas cada vez que hagas push.
