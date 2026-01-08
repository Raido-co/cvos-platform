# cvOS - ATS CV Optimizer

> **Supera los filtros ATS. Consigue más entrevistas.**  
> Un producto de **Raido 2026**

[![CI Status](https://github.com/Raido-co/cvos-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/Raido-co/cvos-platform/actions)

## Demo

| Ambiente | URL |
|----------|-----|
| Production | [cvos.raido.com.co](https://cvos.raido.com.co) |
| API | [cvos-platform-production.up.railway.app](https://cvos-platform-production.up.railway.app) |

---

## Contenido

1. [Arquitectura](#arquitectura)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Git Flow](#git-flow)
4. [CI/CD](#cicd)
5. [Quick Start](#quick-start)
6. [Equipo](#equipo)

---

## Arquitectura

```mermaid
flowchart TB
    subgraph Client["Cliente"]
        U[Usuario]
    end
    
    subgraph Frontend["Frontend - Vercel"]
        NX[Next.js 16]
        NX --> R[React 19]
        NX --> TW[TailwindCSS 4]
    end
    
    subgraph Backend["Backend - Railway"]
        FA[FastAPI]
        FA --> PDF[PDF Generator]
        FA --> ATS[ATS Analyzer]
        FA --> AI[Gemini AI]
    end
    
    U --> NX
    NX -->|REST API| FA
    
    style Frontend fill:#0ea5e9,color:#fff
    style Backend fill:#8b5cf6,color:#fff
```

---

## Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|------------|---------|
| Frontend | Next.js | 16.1 |
| Frontend | React | 19.2 |
| Frontend | TailwindCSS | 4.0 |
| Backend | Python | 3.11 |
| Backend | FastAPI | 0.109 |
| Backend | WeasyPrint | 67.0 |
| AI | Google Gemini | API |
| Hosting FE | Vercel | - |
| Hosting BE | Railway | - |

---

## Git Flow

```mermaid
gitGraph
    commit id: "v1.0.0" tag: "prod"
    branch develop
    commit id: "setup"
    branch feature/auth
    commit id: "login"
    checkout develop
    merge feature/auth
    checkout main
    merge develop tag: "v1.1.0"
```

| Branch | Propósito | Deploy |
|--------|-----------|--------|
| `main` | Producción | Vercel Prod + Railway |
| `develop` | Integración | Vercel Preview |
| `feature/*` | Nuevas features | Vercel Preview |

---

## CI/CD

```mermaid
flowchart LR
    A[Push/PR] --> B[GitHub Actions]
    B --> C[Build Frontend]
    B --> D[Test Backend]
    C --> E[Vercel Deploy]
    D --> F[Railway Deploy]
    
    style B fill:#22c55e,color:#fff
```

| Job | Steps |
|-----|-------|
| `build-frontend` | checkout, npm ci, npm build |
| `test-backend` | pip install, pytest, pdf generation test |

---

## Quick Start

### Frontend
```bash
cd apps/web
npm install
npm run dev
```

### Backend
```bash
cd apps/api
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Estructura del Proyecto

```
apps/
├── web/                    # Frontend Next.js
│   ├── app/
│   │   ├── page.tsx        # Landing
│   │   ├── checker/        # ATS Checker
│   │   ├── dashboard/      # CV Wizard
│   │   ├── pricing/        # Planes
│   │   └── login/          # Auth
│   └── components/
│
└── api/                    # Backend FastAPI
    ├── main.py
    ├── pdf_generator.py
    ├── ats_checker.py
    └── templates/
        ├── cv_classic.html
        ├── cv_modern.html
        └── cv_executive.html
```

---

## Equipo

| Nombre | Rol |
|--------|-----|
| Will | DevSecOps |
| Santi | Security Engineer |
| Edgar | Developer |

---

*cvOS © 2026 — Raido*
