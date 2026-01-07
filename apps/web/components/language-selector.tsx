"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage, Locale } from "@/components/language-provider"

const languages = [
    { code: 'es' as Locale, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as Locale, name: 'English', flag: '🇺🇸' },
    { code: 'ru' as Locale, name: 'Русский', flag: '🇷🇺' }
]

export function LanguageSelector() {
    const { locale, setLocale } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const currentLang = languages.find(l => l.code === locale) || languages[0]

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="font-mono text-xs px-2 gap-1"
            >
                <Globe className="h-3.5 w-3.5" />
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{locale.toUpperCase()}</span>
            </Button>

            {isOpen && (
                <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-50 min-w-[140px] py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLocale(lang.code)
                                setIsOpen(false)
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 transition-colors ${locale === lang.code ? 'text-primary bg-primary/5' : 'text-foreground'
                                }`}
                        >
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                            {locale === lang.code && <Check className="h-3 w-3 ml-auto" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
