"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function CheckerPage() {
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const [useAI, setUseAI] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setResult(null)
        }
    }

    const handleAnalyze = async () => {
        if (!file) return

        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            // Nota: En producción usar la variable de entorno NEXT_PUBLIC_API_URL
            // Para desarrollo local probar con localhost:8000 si no hay proxy configurado
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            const endpoint = useAI ? "/analyze-with-ai" : "/analyze"

            const res = await fetch(`${apiUrl}${endpoint}`, {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Error en el análisis")

            const data = await res.json()
            setResult(data)
        } catch (error) {
            console.error(error)
            alert("Ocurrió un error al analizar el documento.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 flex flex-col items-center">
            <div className="max-w-3xl w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Medidor ATS</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                        Sube tu CV en PDF y obtén un análisis de compatibilidad instantáneo.
                    </p>
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Cargar Documento</CardTitle>
                        <CardDescription>Formatos aceptados: PDF (Máx 5MB)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer relative">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <Upload className="h-10 w-10 text-slate-400 mb-4" />
                            {file ? (
                                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                                    <FileText className="h-5 w-5" />
                                    {file.name}
                                </div>
                            ) : (
                                <>
                                    <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                                        Arrastra tu archivo aquí o haz clic para buscar
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">Solo archivos PDF</p>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mb-4 justify-center">
                            <input
                                type="checkbox"
                                id="ai-mode"
                                checked={useAI}
                                onChange={(e) => setUseAI(e.target.checked)}
                                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                            />
                            <label htmlFor="ai-mode" className="text-sm font-medium text-slate-700 dark:text-slate-200 cursor-pointer select-none flex items-center gap-1">
                                Activar Análisis con IA (Gemini Pro) <Zap className="h-3 w-3 text-amber-500" />
                            </label>
                        </div>

                        <Button
                            className={`w-full h-12 text-lg ${useAI ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            disabled={!file || loading}
                            onClick={handleAnalyze}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> {useAI ? "Consultando IA..." : "Analizando..."}
                                </>
                            ) : (
                                useAI ? "Analizar con IA Global" : "Analizar ATS Score"
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {result && (
                    <Card className="w-full border-green-200 dark:border-green-900 shadow-lg animate-in fade-in slide-in-from-bottom-4">
                        <CardHeader className="bg-green-50 dark:bg-green-900/10 border-b border-green-100 dark:border-green-900/30">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-green-800 dark:text-green-400">Resultados del Análisis</CardTitle>
                                <div className="flex items-center gap-2 text-2xl font-bold text-green-700 dark:text-green-300">
                                    {result.score}%
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>Compatibilidad General</span>
                                    <span>{result.score}/100</span>
                                </div>
                                <Progress value={result.score} className="h-3" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" /> Secciones Detectadas
                                    </h4>
                                    <ul className="space-y-2">
                                        {(result.sections_found || result.strengths || []).map((sec: string) => (
                                            <li key={sec} className="text-sm bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full inline-block mr-2 mb-2">
                                                {sec}
                                            </li>
                                        ))}
                                    </ul>

                                    {result.weaknesses && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold mb-3 flex items-center gap-2 text-rose-600">
                                                <AlertCircle className="h-4 w-4" /> Áreas de Mejora (IA)
                                            </h4>
                                            <ul className="space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                                                {result.weaknesses.map((weak: string) => (
                                                    <li key={weak}>{weak}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-amber-500" /> Resumen
                                    </h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-3 rounded-md border">
                                        {result.summary}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
