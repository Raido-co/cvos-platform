"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

export type Locale = 'en' | 'es'

type LanguageContextType = {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
    en: {
        "nav.checking": "Checking",
        "nav.dashboard": "Dashboard",
        "hero.title": "Recruiting Logic,",
        "hero.subtitle": "Decompiled.",
        "hero.desc": "Reverse engineer the hiring process. Analyze your resume against ATS algorithms and optimize with AI-driven insights.",
        "hero.cta": "Run Diagnostics",
        "hero.dashboard": "Open Dashboard",
        "features.ats": "Heuristic analysis engine that decodes PDF structures to verify machine-readability.",
        "features.layout": "Server-side rendering (WeasyPrint) to generate Harvard-standard standardized documents.",
        "features.ai": "Integrated LLM analysis for deep semantic evaluation of professional experience."
    },
    es: {
        "nav.checking": "Verificador",
        "nav.dashboard": "Panel de Control",
        "hero.title": "Lógica de Reclutamiento,",
        "hero.subtitle": "Descompilada.",
        "hero.desc": "Realiza ingeniería inversa a tu proceso de contratación. Analiza tu CV contra algoritmos ATS y optimízalo con IA.",
        "hero.cta": "Ejecutar Diagnóstico",
        "hero.dashboard": "Abrir Panel",
        "features.ats": "Motor de análisis heurístico que decodifica estructuras PDF para verificar legibilidad por máquina.",
        "features.layout": "Renderizado del lado del servidor (WeasyPrint) para generar documentos estandarizados formato Harvard.",
        "features.ai": "Análisis LLM integrado para evaluación semántica profunda de experiencia profesional."
    }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>('es') // Default to Spanish as requested via "changing language to ES/EN"

    const t = (key: string) => {
        return translations[locale][key as keyof typeof translations['en']] || key
    }

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
