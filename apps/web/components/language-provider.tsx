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
        // Hero
        "hero.title": "Beat the Resume Bots.",
        "hero.subtitle": "Land More Interviews.",
        "hero.desc": "Most CVs are rejected by ATS (Applicant Tracking Systems) before a human ever sees them. We help you optimize your resume to pass these filters and get noticed.",
        "hero.cta": "Analyze My CV",
        "hero.dashboard": "Create My CV",
        // ATS
        "ats.title": "What is an ATS?",
        "ats.desc": "An Applicant Tracking System is software that companies use to automatically filter thousands of resumes. It scans for keywords, analyzes formatting, and scores candidates before a recruiter ever sees your CV.",
        // Features
        "features.ats": "Upload your CV and get instant feedback on ATS compatibility, keyword density, and formatting issues.",
        "features.layout": "Generate professional, ATS-friendly CVs using proven templates that pass automated filters.",
        "features.ai": "Get AI-powered suggestions to improve your resume content and increase your interview chances.",
        "cta.premium": "Go Pro for AI-powered improvements →"
    },
    es: {
        // Navegación
        "nav.checking": "Verificar CV",
        "nav.dashboard": "Crear CV",
        // Hero
        "hero.title": "Supera los Filtros ATS.",
        "hero.subtitle": "Consigue Más Entrevistas.",
        "hero.desc": "La mayoría de CVs son rechazados por sistemas ATS (Applicant Tracking Systems) antes de que un humano los vea. Te ayudamos a optimizar tu currículum para pasar estos filtros automáticos.",
        "hero.cta": "Analizar Mi CV",
        "hero.dashboard": "Crear Mi CV",
        // ATS
        "ats.title": "¿Qué es un ATS?",
        "ats.desc": "Un Sistema de Seguimiento de Candidatos es un software que las empresas usan para filtrar automáticamente miles de currículums. Busca palabras clave, analiza el formato y puntúa candidatos antes de que un reclutador vea tu CV.",
        // Features
        "features.ats": "Sube tu CV y obtén feedback instantáneo sobre compatibilidad ATS, densidad de palabras clave y problemas de formato.",
        "features.layout": "Genera CVs profesionales y compatibles con ATS usando plantillas probadas que pasan filtros automáticos.",
        "features.ai": "Obtén sugerencias con IA para mejorar el contenido de tu currículum y aumentar tus posibilidades de entrevista.",
        "cta.premium": "Hazte Pro para mejoras con IA →"
    },
    ru: {
        // Навигация
        "nav.checking": "Проверка CV",
        "nav.dashboard": "Создать CV",
        // Hero
        "hero.title": "Пройди фильтры ATS.",
        "hero.subtitle": "Получи больше собеседований.",
        "hero.desc": "Большинство резюме отклоняются системами ATS (Applicant Tracking Systems) еще до того, как их увидит рекрутер. Мы поможем оптимизировать ваше резюме для прохождения автоматических фильтров.",
        "hero.cta": "Анализировать CV",
        "hero.dashboard": "Создать CV",
        // ATS
        "ats.title": "Что такое ATS?",
        "ats.desc": "Система отслеживания кандидатов — это программное обеспечение, которое компании используют для автоматической фильтрации тысяч резюме. Она ищет ключевые слова, анализирует форматирование и оценивает кандидатов до того, как рекрутер увидит ваше резюме.",
        // Features
        "features.ats": "Загрузите резюме и получите мгновенную обратную связь о совместимости с ATS, плотности ключевых слов и проблемах форматирования.",
        "features.layout": "Создавайте профессиональные резюме, совместимые с ATS, используя проверенные шаблоны.",
        "features.ai": "Получите рекомендации на основе ИИ для улучшения содержания резюме и увеличения шансов на собеседование.",
        "cta.premium": "Перейти на Pro для улучшений с ИИ →"
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

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('cvos_locale') as Locale
        if (saved && ['en', 'es', 'ru'].includes(saved)) {
            setLocaleState(saved)
        } else {
            // Auto-detect browser language
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
