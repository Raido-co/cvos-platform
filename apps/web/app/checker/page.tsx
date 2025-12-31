"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Zap, Terminal, Command, ArrowLeft } from "lucide-react"

export default function CheckerPage() {
    const router = useRouter()
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
            // Robust URL construction with production fallback
            let baseUrl = process.env.NEXT_PUBLIC_API_URL
                || (typeof window !== 'undefined' && window.location.hostname !== 'localhost'
                    ? "https://cvos-platform-production.up.railway.app"
                    : "http://localhost:8000")
            // Remove trailing slash if present
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
                    throw new Error(`Error API: ${res.status} ${res.statusText} (Posible error de CORS o URL incorrecta)`)
                }
            }

            const data = await res.json()
            setResult(data)
        } catch (err: any) {
            console.error("❌ API Error:", err)
            setError(err.message || "Error al conectar con el servidor. Revisa la consola y la URL de la API.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center font-sans">
            <div className="max-w-4xl w-full space-y-8">
                {/* Header & Nav */}
                <div className="flex items-start justify-between w-full">
                    <Button variant="ghost" className="text-muted-foreground hover:text-primary font-mono" onClick={() => router.push('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> cd ..
                    </Button>
                </div>

                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4 ring-1 ring-primary/30">
                        <Terminal className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-foreground font-mono tracking-tight">System_Diagnostics</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Initiate heuristic scan or LLM-based deep analysis of your resume artifact.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Upload Area */}
                    <Card className="lg:col-span-2 border-border/60 bg-card/60 backdrop-blur shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-mono text-lg">
                                <Command className="h-4 w-4 text-primary" /> Input_Source
                            </CardTitle>
                            <CardDescription className="font-mono text-xs">Target file for analysis (.PDF)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative group ${error ? 'border-red-500/50 bg-red-500/5' : 'border-border hover:border-primary/50 hover:bg-muted/30'}`}>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                <div className="h-14 w-14 bg-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {file ? <FileText className="h-7 w-7 text-primary" /> : <Upload className="h-7 w-7 text-muted-foreground" />}
                                </div>

                                {file ? (
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-foreground font-semibold font-mono">{file.name}</span>
                                        <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-lg font-medium text-foreground">
                                            Drop artifact here
                                        </p>
                                        <p className="text-sm text-muted-foreground font-mono">or click to browse filesystem</p>
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
                                    <span>Enable Gemini Core Analysis</span>
                                    <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-mono">
                                        <Zap className="h-3 w-3" /> PREMIUM
                                    </span>
                                </label>
                            </div>

                            <Button
                                className={`w-full h-12 text-lg font-mono tracking-wide shadow-lg ${useAI ? 'bg-primary hover:bg-primary/90' : 'bg-primary hover:bg-primary/90'}`}
                                disabled={!file || loading}
                                onClick={handleAnalyze}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> PROCESSING...
                                    </>
                                ) : (
                                    useAI ? "> RUN DEEP_SCAN" : "> RUN QUICK_CHECK"
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Results Area */}
                    <div className="lg:col-span-1">
                        {result ? (
                            <Card className="w-full h-full border-primary/20 bg-black/40 backdrop-blur shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                                <CardHeader className="bg-secondary/50 border-b border-border">
                                    <CardTitle className="font-mono text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <Terminal className="h-3 w-3" /> Output_Log
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-6 font-mono text-sm">
                                    <div className="flex justify-between items-end border-b border-border pb-4">
                                        <span className="text-muted-foreground">COMPATIBILITY:</span>
                                        <span className={`text-4xl font-bold ${result.score >= 80 ? 'text-green-500' : result.score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                            {result.score}%
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xs text-muted-foreground uppercase mb-2">Detected Modules</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {(result.sections_found || result.strengths || []).map((sec: string) => (
                                                    <span key={sec} className="px-2 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded text-xs flex items-center gap-1">
                                                        <CheckCircle className="h-3 w-3" /> {sec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {result.weaknesses && (
                                            <div>
                                                <h4 className="text-xs text-muted-foreground uppercase mb-2 text-red-400">Critical Errors</h4>
                                                <ul className="space-y-2">
                                                    {result.weaknesses.map((weak: string) => (
                                                        <li key={weak} className="flex items-start gap-2 text-xs text-red-300">
                                                            <span className="mt-0.5">✖</span> {weak}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        <div className="bg-secondary/50 p-3 rounded border border-border">
                                            <h4 className="text-xs text-primary uppercase mb-1">System Summary</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {result.summary}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="h-full border-2 border-dashed border-border/50 rounded-xl flex items-center justify-center p-8 text-center bg-card/20 min-h-[300px]">
                                <div className="space-y-2 text-muted-foreground/40 font-mono text-sm">
                                    <Terminal className="h-8 w-8 mx-auto mb-2" />
                                    <p>Waiting for input stream...</p>
                                    <p className="text-xs">Results will render here.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
