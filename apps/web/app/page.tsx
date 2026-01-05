"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileCheck, Layout, Cpu, Globe, CheckCircle, AlertTriangle, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function Home() {
  const { t, locale, setLocale } = useLanguage()

  const cycleLanguage = () => {
    const order = ['es', 'en', 'ru'] as const
    const currentIdx = order.indexOf(locale)
    const nextIdx = (currentIdx + 1) % order.length
    setLocale(order[nextIdx])
  }

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="px-4 md:px-6 h-16 flex items-center border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="mr-8 flex items-center gap-2 font-mono font-bold text-xl text-primary md:text-2xl tracking-tighter">
          <FileCheck className="h-6 w-6" />
          <span>cvOS</span>
        </Link>
        <nav className="flex gap-6 text-sm font-medium text-muted-foreground hidden md:flex">
          <Link href="/checker" className="hover:text-primary transition-colors duration-200">{t("nav.checking")}</Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors duration-200">{t("nav.dashboard")}</Link>
        </nav>
        <div className="ml-auto flex gap-2 md:gap-4 items-center">
          <Button variant="ghost" size="sm" onClick={cycleLanguage} className="font-mono text-xs px-2">
            <Globe className="mr-1 md:mr-2 h-3 w-3" />
            {locale.toUpperCase()}
          </Button>

          <Link href="/checker" className="hidden md:block">
            <Button className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              {t("hero.cta")} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />

        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-mono mb-8">
            <Sparkles className="h-3 w-3" />
            {locale === 'es' ? 'Gratis • Sin registro' : 'Free • No signup required'}
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
            {t("hero.title")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{t("hero.subtitle")}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero.desc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Link href="/checker" className="flex-1">
              <Button size="lg" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 font-semibold shadow-xl shadow-primary/20">
                <FileCheck className="mr-2 h-5 w-5" /> {t("hero.cta")}
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button size="lg" variant="outline" className="w-full h-14 text-lg font-semibold">
                <Layout className="mr-2 h-5 w-5" /> {t("hero.dashboard")}
              </Button>
            </Link>
          </div>
        </section>

        {/* What is ATS Section */}
        <section className="w-full max-w-4xl mx-auto px-6 pb-16">
          <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              {t("ats.title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t("ats.desc")}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{locale === 'es' ? 'Usa palabras clave de la oferta de empleo' : 'Use keywords from the job posting'}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{locale === 'es' ? 'Evita columnas y tablas complejas' : 'Avoid complex columns and tables'}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{locale === 'es' ? 'Usa formato simple y limpio' : 'Use clean, simple formatting'}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">{locale === 'es' ? 'Incluye secciones estándar (Experiencia, Educación)' : 'Include standard sections (Experience, Education)'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="w-full max-w-6xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-6 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-all">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{locale === 'es' ? 'Análisis ATS' : 'ATS Analysis'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.ats")}
              </p>
            </div>

            <div className="group p-6 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-all">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{locale === 'es' ? 'Plantillas Profesionales' : 'Pro Templates'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.layout")}
              </p>
            </div>

            <div className="group p-6 rounded-xl border border-border bg-card/50 hover:border-primary/30 transition-all relative overflow-hidden">
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary/20 text-primary text-xs rounded font-mono">PRO</div>
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{locale === 'es' ? 'Mejoras con IA' : 'AI Improvements'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.ai")}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border bg-muted/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© 2024 cvOS Platform.</span>
          <a href="https://raido.com.co" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Powered by <span className="font-semibold">RAIDO</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
