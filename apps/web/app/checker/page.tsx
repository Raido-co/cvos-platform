"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Zap, Terminal, Command, ArrowLeft, ChevronDown, ChevronUp, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"

// Collapsible Section Component
function CollapsibleSection({ title, icon: Icon, items, variant = 'default' }: {
    title: string
    icon: any
    items: string[]
    variant?: 'default' | 'warning' | 'success'
}) {
    const [isOpen, setIsOpen] = useState(true)

    const colors = {
        default: 'text-muted-foreground border-border',
        warning: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5',
        success: 'text-green-400 border-green-500/30 bg-green-500/5'
    }

    return (
        <div className={`border rounded-lg overflow-hidden ${colors[variant]}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/20 transition-colors"
            >
                <div className="flex items-center gap-2 text-xs uppercase font-semibold">
                    <Icon className="h-3.5 w-3.5" />
                    {title}
                </div>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {isOpen && (
                <div className="px-3 pb-3 space-y-2">
                    {items.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                            <span className="mt-0.5">•</span>
                            <span className="text-muted-foreground">{item}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function CheckerPage() {
    const router = useRouter()
    const { t } = useLanguage()
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [useAI, setUseAI] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setResult(null)
            setError(null)
        }
    }

    const handleAnalyze = async () => {
        if (!file) return

        setLoading(true)
        setError(null)
        const formData = new FormData()
        formData.append("file", file)

        try {
            let baseUrl = process.env.NEXT_PUBLIC_API_URL
                || (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
                    ? "https://cvos-platform-production.up.railway.app"
                    : "http://localhost:8000")
            if (baseUrl.endsWith('/')) {
                baseUrl = baseUrl.slice(0, -1)
            }

            const endpoint = useAI ? "/analyze-with-ai" : "/analyze"
            const fullUrl = `${baseUrl}${endpoint}`

            console.log("🚀 Connecting to API:", fullUrl)

            const res = await fetch(fullUrl, {
                method: "POST",
                body: formData,
            })

            if (!res.ok) {
                const contentType = res.headers.get("content-type")
                if (contentType && contentType.includes("application/json")) {
                    const errData = await res.json().catch(() => ({}))
                    throw new Error(errData.detail || `Error API: ${res.status} ${res.statusText}`)
                } else {
                    throw new Error(`Error API: ${res.status} ${res.statusText}`)
                }
            }

            const data = await res.json()
            setResult(data)
        } catch (err: any) {
            console.error("❌ API Error:", err)
            setError(err.message || t("checker.error"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8 flex flex-col items-center font-sans">
            <div className="max-w-6xl w-full space-y-8">
                {/* Header & Nav */}
                <div className="flex items-center justify-between w-full">
                    <Button variant="ghost" className="text-muted-foreground hover:text-primary font-mono" onClick={() => router.push('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> {t("nav.back")}
                    </Button>
                    <LanguageSelector />
                </div>

                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 ring-1 ring-primary/30">
                        <Terminal className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-foreground font-mono tracking-tight">{t("checker.title")}</h1>
                    <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                        {t("checker.subtitle")}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upload Area */}
                    <Card className="border-border/60 bg-card/60 backdrop-blur shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-mono text-lg">
                                <Command className="h-4 w-4 text-primary" /> {t("checker.upload")}
                            </CardTitle>
                            <CardDescription className="font-mono text-xs">{t("checker.uploadDesc")}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative group ${error ? 'border-red-500/50 bg-red-500/5' : 'border-border hover:border-primary/50 hover:bg-muted/30'}`}>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {file ? <FileText className="h-6 w-6 text-primary" /> : <Upload className="h-6 w-6 text-muted-foreground" />}
                                </div>

                                {file ? (
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-foreground font-semibold font-mono">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-lg font-medium text-foreground">{t("checker.dragDrop")}</p>
                                        <p className="text-sm text-muted-foreground">{t("checker.orClick")}</p>
                                    </>
                                )}
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono rounded flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </div>
                            )}

                            <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border/50">
                                <input
                                    type="checkbox"
                                    id="ai-mode"
                                    checked={useAI}
                                    onChange={(e) => setUseAI(e.target.checked)}
                                    className="w-4 h-4 text-primary rounded focus:ring-primary border-muted-foreground/30 bg-background"
                                />
                                <label htmlFor="ai-mode" className="flex-1 text-sm font-medium text-foreground cursor-pointer select-none flex items-center justify-between">
                                    <span>{t("checker.aiMode")}</span>
                                    <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-mono">
                                        <Zap className="h-3 w-3" /> PRO
                                    </span>
                                </label>
                            </div>

                            <Button
                                className="w-full h-12 text-lg font-mono tracking-wide shadow-lg bg-primary hover:bg-primary/90"
                                disabled={!file || loading}
                                onClick={handleAnalyze}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analizando...
                                    </>
                                ) : (
                                    "Analizar CV"
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results Area */}
                    <div>
                        {result ? (
                            <Card className="w-full border-primary/20 bg-card/80 backdrop-blur shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                                <CardHeader className="bg-secondary/50 border-b border-border">
                                    <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Terminal className="h-3 w-3" /> Resultados del Análisis
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-5">
                                    {/* Score */}
                                    <div className="text-center py-4 border-b border-border">
                                        <p className="text-xs text-muted-foreground uppercase mb-2">Compatibilidad ATS Estimada</p>
                                        <span className={`text-6xl font-bold ${result.score >= 80 ? 'text-green-500' : result.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                            {result.score}%
                                        </span>
                                    </div>

                                    {/* Metrics */}
                                    {result.metrics && (
                                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                            <div className="bg-muted/30 p-3 rounded-lg">
                                                <p className="text-muted-foreground">Palabras</p>
                                                <p className="text-lg font-bold text-foreground">{result.metrics.word_count}</p>
                                            </div>
                                            <div className="bg-muted/30 p-3 rounded-lg">
                                                <p className="text-muted-foreground">Viñetas</p>
                                                <p className="text-lg font-bold text-foreground">{result.metrics.bullet_count}</p>
                                            </div>
                                            <div className="bg-muted/30 p-3 rounded-lg">
                                                <p className="text-muted-foreground">Legibilidad</p>
                                                <p className="text-lg font-bold text-foreground">{result.metrics.readability_score}/100</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Collapsible Sections */}
                                    <div className="space-y-3">
                                        {result.issues && result.issues.length > 0 && (
                                            <CollapsibleSection
                                                title="Qué Revisar"
                                                icon={AlertTriangle}
                                                items={result.issues}
                                                variant="warning"
                                            />
                                        )}

                                        {result.improvements && result.improvements.length > 0 && (
                                            <CollapsibleSection
                                                title="Cómo Mejorarlo"
                                                icon={Lightbulb}
                                                items={result.improvements}
                                            />
                                        )}

                                        {result.strengths && result.strengths.length > 0 && (
                                            <CollapsibleSection
                                                title="Lo Que Está Bien"
                                                icon={CheckCircle}
                                                items={result.strengths}
                                                variant="success"
                                            />
                                        )}
                                    </div>

                                    {/* Sections Found */}
                                    {result.sections_found && result.sections_found.length > 0 && (
                                        <div>
                                            <p className="text-xs text-muted-foreground uppercase mb-2">Secciones Detectadas</p>
                                            <div className="flex flex-wrap gap-2">
                                                {result.sections_found.map((sec: string) => (
                                                    <span key={sec} className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-xs flex items-center gap-1">
                                                        <CheckCircle className="h-3 w-3" /> {sec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Summary */}
                                    <div className="bg-secondary/50 p-4 rounded-lg border border-border">
                                        <p className="text-xs text-primary uppercase mb-1 font-semibold">Resumen</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {result.summary}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <Button
                                        variant="outline"
                                        className="w-full font-mono"
                                        onClick={() => router.push('/dashboard')}
                                    >
                                        <TrendingUp className="mr-2 h-4 w-4" /> Crear CV Optimizado
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="h-full border-2 border-dashed border-border/50 rounded-xl flex items-center justify-center p-8 text-center bg-card/20 min-h-[400px]">
                                <div className="space-y-2 text-muted-foreground/40 font-mono text-sm">
                                    <Terminal className="h-8 w-8 mx-auto mb-2" />
                                    <p>Esperando archivo...</p>
                                    <p className="text-xs">Los resultados aparecerán aquí.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
