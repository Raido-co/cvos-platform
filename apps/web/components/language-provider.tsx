"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Locale = 'en' | 'es' | 'ru'

type LanguageContextType = {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
    en: {
        // Navigation
        "nav.checking": "ATS Check",
        "nav.dashboard": "Create CV",
        "nav.pricing": "Pricing",
        "nav.back": "Back",
        "nav.exit": "Exit",
        // Hero
        "hero.title": "Beat the Resume Bots.",
        "hero.subtitle": "Land More Interviews.",
        "hero.desc": "Most CVs are rejected by ATS (Applicant Tracking Systems) before a human ever sees them. We help you optimize your resume to pass these filters and get noticed.",
        "hero.cta": "Analyze My CV",
        "hero.dashboard": "Create My CV",
        "hero.free": "Free • No signup required",
        // ATS
        "ats.title": "What is an ATS?",
        "ats.desc": "An Applicant Tracking System is software that companies use to automatically filter thousands of resumes. It scans for keywords, analyzes formatting, and scores candidates before a recruiter ever sees your CV.",
        // Features
        "features.ats": "Upload your CV and get instant feedback on ATS compatibility, keyword density, and formatting issues.",
        "features.layout": "Generate professional, ATS-friendly CVs using proven templates that pass automated filters.",
        "features.ai": "Get AI-powered suggestions to improve your resume content and increase your interview chances.",
        "cta.premium": "Go Pro for AI-powered improvements →",
        // Checker page
        "checker.title": "ATS Analyzer",
        "checker.subtitle": "Check if your CV will pass automated recruiting filters (ATS).",
        "checker.upload": "Upload CV",
        "checker.uploadDesc": "PDF file of your resume",
        "checker.dragDrop": "Drag your CV here",
        "checker.orClick": "or click to select",
        "checker.aiMode": "AI Analysis (Gemini)",
        "checker.analyze": "Analyze CV",
        "checker.analyzing": "Analyzing...",
        "checker.results": "Analysis Results",
        "checker.score": "Estimated ATS Compatibility",
        "checker.words": "Words",
        "checker.bullets": "Bullets",
        "checker.readability": "Readability",
        "checker.issues": "What to Fix",
        "checker.improvements": "How to Improve",
        "checker.strengths": "What's Good",
        "checker.sections": "Sections Detected",
        "checker.summary": "Summary",
        "checker.createOptimized": "Create Optimized CV",
        "checker.waiting": "Waiting for file...",
        "checker.resultsHere": "Results will appear here.",
        "checker.error": "Error connecting to server.",
        // Dashboard page
        "dashboard.title": "CV Wizard",
        "dashboard.step": "Step",
        "dashboard.of": "of",
        "dashboard.previous": "Previous",
        "dashboard.next": "Next",
        "dashboard.continue": "Continue",
        "dashboard.back": "Back",
        "dashboard.personal": "Personal Info",
        "dashboard.education": "Education",
        "dashboard.experience": "Experience",
        "dashboard.skills": "Skills & Certs",
        "dashboard.preview": "Preview",
        // Form labels
        "form.fullName": "Full Name",
        "form.title": "Professional Title",
        "form.email": "Email",
        "form.phone": "Phone",
        "form.location": "Location",
        "form.website": "Website",
        "form.summary": "Professional Summary",
        "form.skills": "Skills",
        "form.languages": "Languages",
        "form.interests": "Interests",
        "form.add": "Add",
        "form.remove": "Remove",
        // Preview
        "preview.title": "Review & Export",
        "preview.desc": "Verify your information before generating the CV.",
        "preview.download": "Download PDF",
        "preview.note": "* PDF generated with Harvard template optimized for ATS"
    },
    es: {
        // Navegación
        "nav.checking": "Verificar CV",
        "nav.dashboard": "Crear CV",
        "nav.pricing": "Precios",
        "nav.back": "Volver",
        "nav.exit": "Salir",
        // Hero
        "hero.title": "Supera los Filtros ATS.",
        "hero.subtitle": "Consigue Más Entrevistas.",
        "hero.desc": "La mayoría de CVs son rechazados por sistemas ATS (Applicant Tracking Systems) antes de que un humano los vea. Te ayudamos a optimizar tu currículum para pasar estos filtros automáticos.",
        "hero.cta": "Analizar Mi CV",
        "hero.dashboard": "Crear Mi CV",
        "hero.free": "Gratis • Sin registro",
        // ATS
        "ats.title": "¿Qué es un ATS?",
        "ats.desc": "Un Sistema de Seguimiento de Candidatos es un software que las empresas usan para filtrar automáticamente miles de currículums. Busca palabras clave, analiza el formato y puntúa candidatos antes de que un reclutador vea tu CV.",
        // Features
        "features.ats": "Sube tu CV y obtén feedback instantáneo sobre compatibilidad ATS, densidad de palabras clave y problemas de formato.",
        "features.layout": "Genera CVs profesionales y compatibles con ATS usando plantillas probadas que pasan filtros automáticos.",
        "features.ai": "Obtén sugerencias con IA para mejorar el contenido de tu currículum y aumentar tus posibilidades de entrevista.",
        "cta.premium": "Hazte Pro para mejoras con IA →",
        // Página Checker
        "checker.title": "Analizador ATS",
        "checker.subtitle": "Verifica si tu CV pasará los filtros automáticos de reclutamiento (ATS).",
        "checker.upload": "Subir CV",
        "checker.uploadDesc": "Archivo PDF de tu currículum",
        "checker.dragDrop": "Arrastra tu CV aquí",
        "checker.orClick": "o haz clic para seleccionar",
        "checker.aiMode": "Análisis con IA (Gemini)",
        "checker.analyze": "Analizar CV",
        "checker.analyzing": "Analizando...",
        "checker.results": "Resultados del Análisis",
        "checker.score": "Compatibilidad ATS Estimada",
        "checker.words": "Palabras",
        "checker.bullets": "Viñetas",
        "checker.readability": "Legibilidad",
        "checker.issues": "Qué Revisar",
        "checker.improvements": "Cómo Mejorarlo",
        "checker.strengths": "Lo Que Está Bien",
        "checker.sections": "Secciones Detectadas",
        "checker.summary": "Resumen",
        "checker.createOptimized": "Crear CV Optimizado",
        "checker.waiting": "Esperando archivo...",
        "checker.resultsHere": "Los resultados aparecerán aquí.",
        "checker.error": "Error al conectar con el servidor.",
        // Página Dashboard
        "dashboard.title": "Asistente de CV",
        "dashboard.step": "Paso",
        "dashboard.of": "de",
        "dashboard.previous": "Anterior",
        "dashboard.next": "Siguiente",
        "dashboard.continue": "Continuar",
        "dashboard.back": "Atrás",
        "dashboard.personal": "Datos Personales",
        "dashboard.education": "Educación",
        "dashboard.experience": "Experiencia",
        "dashboard.skills": "Habilidades",
        "dashboard.preview": "Vista Previa",
        // Etiquetas de formulario
        "form.fullName": "Nombre Completo",
        "form.title": "Título Profesional",
        "form.email": "Correo Electrónico",
        "form.phone": "Teléfono",
        "form.location": "Ubicación",
        "form.website": "Sitio Web",
        "form.summary": "Resumen Profesional",
        "form.skills": "Habilidades",
        "form.languages": "Idiomas",
        "form.interests": "Intereses",
        "form.add": "Agregar",
        "form.remove": "Eliminar",
        // Vista previa
        "preview.title": "Revisar y Exportar",
        "preview.desc": "Verifica tu información antes de generar el CV.",
        "preview.download": "Descargar PDF",
        "preview.note": "* PDF generado con plantilla Harvard optimizada para ATS"
    },
    ru: {
        // Навигация
        "nav.checking": "Проверка CV",
        "nav.dashboard": "Создать CV",
        "nav.pricing": "Цены",
        "nav.back": "Назад",
        "nav.exit": "Выход",
        // Hero
        "hero.title": "Пройди фильтры ATS.",
        "hero.subtitle": "Получи больше собеседований.",
        "hero.desc": "Большинство резюме отклоняются системами ATS (Applicant Tracking Systems) еще до того, как их увидит рекрутер. Мы поможем оптимизировать ваше резюме для прохождения автоматических фильтров.",
        "hero.cta": "Анализировать CV",
        "hero.dashboard": "Создать CV",
        "hero.free": "Бесплатно • Без регистрации",
        // ATS
        "ats.title": "Что такое ATS?",
        "ats.desc": "Система отслеживания кандидатов — это программное обеспечение, которое компании используют для автоматической фильтрации тысяч резюме.",
        // Features
        "features.ats": "Загрузите резюме и получите мгновенную обратную связь о совместимости с ATS.",
        "features.layout": "Создавайте профессиональные резюме, совместимые с ATS.",
        "features.ai": "Получите рекомендации на основе ИИ для улучшения содержания резюме.",
        "cta.premium": "Перейти на Pro для улучшений с ИИ →",
        // Страница проверки
        "checker.title": "Анализатор ATS",
        "checker.subtitle": "Проверьте, пройдет ли ваше резюме автоматические фильтры.",
        "checker.upload": "Загрузить CV",
        "checker.uploadDesc": "PDF файл вашего резюме",
        "checker.dragDrop": "Перетащите резюме сюда",
        "checker.orClick": "или нажмите для выбора",
        "checker.aiMode": "Анализ с ИИ (Gemini)",
        "checker.analyze": "Анализировать",
        "checker.analyzing": "Анализ...",
        "checker.results": "Результаты анализа",
        "checker.score": "Оценка совместимости ATS",
        "checker.words": "Слова",
        "checker.bullets": "Пункты",
        "checker.readability": "Читаемость",
        "checker.issues": "Что исправить",
        "checker.improvements": "Как улучшить",
        "checker.strengths": "Что хорошо",
        "checker.sections": "Обнаруженные разделы",
        "checker.summary": "Резюме",
        "checker.createOptimized": "Создать оптимизированное CV",
        "checker.waiting": "Ожидание файла...",
        "checker.resultsHere": "Результаты появятся здесь.",
        "checker.error": "Ошибка подключения к серверу.",
        // Страница Dashboard
        "dashboard.title": "Мастер CV",
        "dashboard.step": "Шаг",
        "dashboard.of": "из",
        "dashboard.previous": "Назад",
        "dashboard.next": "Далее",
        "dashboard.continue": "Продолжить",
        "dashboard.back": "Назад",
        "dashboard.personal": "Личные данные",
        "dashboard.education": "Образование",
        "dashboard.experience": "Опыт",
        "dashboard.skills": "Навыки",
        "dashboard.preview": "Предпросмотр",
        // Метки формы
        "form.fullName": "Полное имя",
        "form.title": "Должность",
        "form.email": "Email",
        "form.phone": "Телефон",
        "form.location": "Местоположение",
        "form.website": "Сайт",
        "form.summary": "Профессиональное резюме",
        "form.skills": "Навыки",
        "form.languages": "Языки",
        "form.interests": "Интересы",
        "form.add": "Добавить",
        "form.remove": "Удалить",
        // Предпросмотр
        "preview.title": "Просмотр и экспорт",
        "preview.desc": "Проверьте информацию перед созданием CV.",
        "preview.download": "Скачать PDF",
        "preview.note": "* PDF создан с шаблоном Harvard, оптимизированным для ATS"
    }
}

// Default context values for SSG/SSR
const defaultLocale: Locale = 'es'
const defaultT = (key: string): string => translations[defaultLocale][key] || key

const LanguageContext = createContext<LanguageContextType>({
    locale: defaultLocale,
    setLocale: () => { },
    t: defaultT
})

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('es')
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('cvos_locale') as Locale
        if (saved && ['en', 'es', 'ru'].includes(saved)) {
            setLocaleState(saved)
        } else {
            const browserLang = navigator.language.toLowerCase()
            if (browserLang.startsWith('en')) {
                setLocaleState('en')
            } else if (browserLang.startsWith('ru')) {
                setLocaleState('ru')
            } else {
                setLocaleState('es')
            }
        }
        setIsHydrated(true)
    }, [])

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale)
        localStorage.setItem('cvos_locale', newLocale)
    }

    const t = (key: string): string => {
        return translations[locale][key] || key
    }

    const value = isHydrated
        ? { locale, setLocale, t }
        : { locale: defaultLocale, setLocale: () => { }, t: defaultT }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    return useContext(LanguageContext)
}
