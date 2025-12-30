# cvOS: ATS Analysis & Professional CV Generation Platform

cvOS is a high-performance, open-source platform designed to optimize the job application process. It leverages heuristic analysis and Large Language Models (LLMs) to ensure CV compatibility with modern Applicant Tracking Systems (ATS).

## Project Overview

The platform provides a comprehensive suite of tools for candidates to analyze, optimize, and generate professional resumes. By utilizing a modular monorepo architecture, cvOS separates concerns between the rendering engine, the analytical backend, and the interactive frontend.

## Core Features

### 1. ATS Compliance Engine
- **Heuristic Section Detection**: Implements automated parsing of PDF documents to identify standard resume components (Work Experience, Education, Technical Skills, etc.).
- **Readability Scoring**: Evaluates document parseability to ensure compatibility with automated recruitment software.

### 2. LLM-Powered Analysis (Gemini Pro)
- **Deep Semantic Analysis**: Integration with Google Generative AI for qualitative feedback on professional experience and skill alignment.
- **Optimization Reporting**: Detailed feedback on strengths, critical weaknesses, and recommended keyphrase injections.

### 3. Professional PDF Generation
- **WeasyPrint Engine**: Server-side PDF rendering using HTML5/CSS3 templates for pixel-perfect, ATS-parseable exports.
- **Jinja2 Templating**: Dynamic content injection into standardized, recruiter-approved layouts.

## Technical Architecture

The project follows a Monorepo structure for consolidated management of both frontend and backend services:

- **Frontend (`/apps/web`)**: 
  - Framework: Next.js 15 (App Router)
  - UI: TailwindCSS + Shadcn/ui
  - Deployment: Optimized for Vercel Edge Network
- **Backend (`/apps/api`)**:
  - Framework: FastAPI (Python 3.11)
  - Processing: PyMuPDF (Text Extraction) and WeasyPrint (PDF Generation)
  - AI Service: Google Generative AI (Gemini Pro)
  - Deployment: Containerized via Docker for Railway.app

## Infrastructure & CI/CD

- **GitHub Actions**: Automated CI pipeline for build verification and syntax validation.
- **Environment Management**: Decoupled configuration via environment variables for security and scalability.

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- Google Generative AI API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Raido-co/cvos-platform.git
cd cvos-platform
```

2. Initialize Backend Service:
```bash
cd apps/api
pip install -r requirements.txt
# Set GOOGLE_API_KEY environment variable
uvicorn main:app --reload
```

3. Initialize Frontend Service:
```bash
cd apps/web
npm install
npm run dev
```

## Documentation

For comprehensive deployment instructions including DNS configuration and platform settings, refer to the [Deployment Guide (DEPLOYMENT.md)](./DEPLOYMENT.md).

## License & Maintenance
Managed by the **[Raido](https://github.com/Raido-co)** organization.
