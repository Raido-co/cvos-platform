"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, FileCheck, ArrowLeft, Sparkles, Crown, Building2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"

const plans = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        description: {
            es: 'Perfecto para empezar',
            en: 'Perfect to get started',
            ru: 'Отлично для начала'
        },
        icon: FileCheck,
        features: {
            es: [
                'Análisis ATS ilimitado',
                '3 CVs por mes',
                '1 plantilla básica',
                'Descarga en PDF'
            ],
            en: [
                'Unlimited ATS analysis',
                '3 CVs per month',
                '1 basic template',
                'PDF download'
            ],
            ru: [
                'Безлимитный анализ ATS',
                '3 резюме в месяц',
                '1 базовый шаблон',
                'Скачать PDF'
            ]
        },
        cta: { es: 'Empezar Gratis', en: 'Start Free', ru: 'Начать бесплатно' },
        popular: false
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 3,
        description: {
            es: 'Para profesionales activos',
            en: 'For active professionals',
            ru: 'Для активных профессионалов'
        },
        icon: Sparkles,
        features: {
            es: [
                'Todo en Free +',
                'CVs ilimitados',
                '5+ plantillas premium',
                'Sugerencias con IA',
                'Sin marca de agua',
                'Soporte prioritario'
            ],
            en: [
                'Everything in Free +',
                'Unlimited CVs',
                '5+ premium templates',
                'AI suggestions',
                'No watermark',
                'Priority support'
            ],
            ru: [
                'Всё из Free +',
                'Безлимитные резюме',
                '5+ премиум шаблонов',
                'ИИ рекомендации',
                'Без водяных знаков',
                'Приоритетная поддержка'
            ]
        },
        cta: { es: 'Obtener Pro', en: 'Get Pro', ru: 'Получить Pro' },
        popular: true
    },
    {
        id: 'business',
        name: 'Business',
        price: 10,
        description: {
            es: 'Para equipos y empresas',
            en: 'For teams and companies',
            ru: 'Для команд и компаний'
        },
        icon: Building2,
        features: {
            es: [
                'Todo en Pro +',
                'Plantillas exclusivas',
                'Múltiples idiomas CV',
                'Exportar a Word/LaTeX',
                'API access',
                'Soporte dedicado 24/7'
            ],
            en: [
                'Everything in Pro +',
                'Exclusive templates',
                'Multi-language CVs',
                'Export to Word/LaTeX',
                'API access',
                'Dedicated 24/7 support'
            ],
            ru: [
                'Всё из Pro +',
                'Эксклюзивные шаблоны',
                'Многоязычные резюме',
                'Экспорт в Word/LaTeX',
                'Доступ к API',
                'Выделенная поддержка 24/7'
            ]
        },
        cta: { es: 'Contactar Ventas', en: 'Contact Sales', ru: 'Связаться с продажами' },
        popular: false
    }
]

export default function PricingPage() {
    const { locale, t } = useLanguage()

    const titles = {
        es: { title: 'Planes y Precios', subtitle: 'Elige el plan perfecto para tu búsqueda de empleo' },
        en: { title: 'Plans & Pricing', subtitle: 'Choose the perfect plan for your job search' },
        ru: { title: 'Планы и цены', subtitle: 'Выберите идеальный план для поиска работы' }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="px-4 md:px-6 h-16 flex items-center border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <Link href="/" className="mr-8 flex items-center gap-2 font-mono font-bold text-xl text-primary tracking-tighter">
                    <FileCheck className="h-6 w-6" />
                    <span>cvOS</span>
                </Link>
                <nav className="flex gap-6 text-sm font-medium text-muted-foreground hidden md:flex">
                    <Link href="/checker" className="hover:text-primary transition-colors">{t("nav.checking")}</Link>
                    <Link href="/dashboard" className="hover:text-primary transition-colors">{t("nav.dashboard")}</Link>
                </nav>
                <div className="ml-auto flex gap-4 items-center">
                    <LanguageSelector />
                    <Link href="/login">
                        <Button variant="outline" className="font-mono text-sm">
                            {locale === 'es' ? 'Iniciar Sesión' : locale === 'ru' ? 'Войти' : 'Sign In'}
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16">
                {/* Title */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {titles[locale as keyof typeof titles]?.title || titles.en.title}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {titles[locale as keyof typeof titles]?.subtitle || titles.en.subtitle}
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            className={`relative flex flex-col ${plan.popular
                                    ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                                    : 'border-border/60'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1">
                                        <Crown className="h-3 w-3" />
                                        {locale === 'es' ? 'Más Popular' : locale === 'ru' ? 'Популярный' : 'Most Popular'}
                                    </span>
                                </div>
                            )}

                            <CardHeader className="text-center pb-2">
                                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${plan.popular ? 'bg-primary/20' : 'bg-muted'
                                    }`}>
                                    <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                                </div>
                                <CardTitle className="text-2xl font-mono">{plan.name}</CardTitle>
                                <CardDescription>
                                    {plan.description[locale as keyof typeof plan.description] || plan.description.en}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-1">
                                <div className="text-center mb-6">
                                    <span className="text-5xl font-bold font-mono">${plan.price}</span>
                                    <span className="text-muted-foreground">/mes</span>
                                </div>

                                <ul className="space-y-3">
                                    {(plan.features[locale as keyof typeof plan.features] || plan.features.en).map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm">
                                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                <Button
                                    className={`w-full font-mono ${plan.popular
                                            ? 'bg-primary hover:bg-primary/90'
                                            : 'bg-secondary hover:bg-secondary/80'
                                        }`}
                                    variant={plan.popular ? 'default' : 'secondary'}
                                >
                                    {plan.cta[locale as keyof typeof plan.cta] || plan.cta.en}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* FAQ or Trust badges */}
                <div className="mt-20 text-center">
                    <p className="text-sm text-muted-foreground">
                        {locale === 'es'
                            ? '🔒 Pagos seguros • Cancela cuando quieras • Garantía de 14 días'
                            : locale === 'ru'
                                ? '🔒 Безопасные платежи • Отмена в любое время • 14-дневная гарантия'
                                : '🔒 Secure payments • Cancel anytime • 14-day guarantee'}
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-border/40 py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-muted-foreground font-mono">
                        cvOS © 2026 — Powered by{' '}
                        <a href="https://raido.com.co" target="_blank" rel="noopener" className="text-primary hover:underline">
                            Raido
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    )
}
