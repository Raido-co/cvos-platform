"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Locale = 'en' | 'es'

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

        // Hero - Clear value proposition
        "hero.title": "Beat the Resume Bots.",
        "hero.subtitle": "Land More Interviews.",
        "hero.desc": "Most CVs are rejected by ATS (Applicant Tracking Systems) before a human ever sees them. We help you optimize your resume to pass these filters and get noticed.",
        "hero.cta": "Analyze My CV",
        "hero.dashboard": "Create My CV",

        // What is ATS section
        "ats.title": "What is an ATS?",
        "ats.desc": "An Applicant Tracking System is software that companies use to automatically filter thousands of resumes. It scans for keywords, analyzes formatting, and scores candidates before a recruiter ever sees your CV.",

        // Features
        "features.ats": "Upload your CV and get instant feedback on ATS compatibility, keyword density, and formatting issues.",
        "features.layout": "Generate professional, ATS-friendly CVs using proven templates that pass automated filters.",
        "features.ai": "Get AI-powered suggestions to improve your resume content and increase your interview chances.",

        // CTA
        "cta.premium": "Go Pro for AI-powered improvements →"
    },
    es: {
        // Navegación
        "nav.checking": "Verificar CV",
        "nav.dashboard": "Crear CV",

        // Hero - Propuesta de valor clara
        "hero.title": "Supera los Filtros ATS.",
        "hero.subtitle": "Consigue Más Entrevistas.",
        "hero.desc": "La mayoría de CVs son rechazados por sistemas ATS (Applicant Tracking Systems) antes de que un humano los vea. Te ayudamos a optimizar tu currículum para pasar estos filtros automáticos.",
        "hero.cta": "Analizar Mi CV",
        "hero.dashboard": "Crear Mi CV",

        // Qué es ATS
        "ats.title": "¿Qué es un ATS?",
        "ats.desc": "Un Sistema de Seguimiento de Candidatos es un software que las empresas usan para filtrar automáticamente miles de currículums. Busca palabras clave, analiza el formato y puntúa candidatos antes de que un reclutador vea tu CV.",

        // Features
        "features.ats": "Sube tu CV y obtén feedback instantáneo sobre compatibilidad ATS, densidad de palabras clave y problemas de formato.",
        "features.layout": "Genera CVs profesionales y compatibles con ATS usando plantillas probadas que pasan filtros automáticos.",
        "features.ai": "Obtén sugerencias con IA para mejorar el contenido de tu currículum y aumentar tus posibilidades de entrevista.",

        // CTA
        "cta.premium": "Hazte Pro para mejoras con IA →"
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
        if (saved && (saved === 'en' || saved === 'es')) {
            setLocaleState(saved)
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language.toLowerCase()
            if (browserLang.startsWith('en')) {
                setLocaleState('en')
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

    // Always provide context, use default locale before hydration
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

