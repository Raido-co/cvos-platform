import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileCheck, Layout, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="px-6 h-16 flex items-center border-b bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="mr-8 flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
          <Zap className="h-6 w-6" />
          <span>cvOS</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/checker" className="hover:text-indigo-600 transition">ATS Checker</Link>
          <Link href="/dashboard" className="hover:text-indigo-600 transition">Dashboard</Link>
        </nav>
        <div className="ml-auto flex gap-4">
          <Link href="/dashboard">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link href="/checker">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            Supérate a ti mismo y a <span className="text-indigo-600">los filtros ATS</span>.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
            Analiza, optimiza y crea un CV profesional diseñado para pasar los sistemas de reclutamiento automático y destacar ante los reclutadores.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/checker">
              <Button size="lg" className="h-12 px-8 text-lg bg-indigo-600 hover:bg-indigo-700">
                Analizar mi CV <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                Crear Perfil
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">ATS Checker</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Sube tu PDF y recibe un puntaje de compatibilidad instantáneo basado en estándares de la industria.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center">
                <Layout className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Dashboard Profesional</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Gestiona tu experiencia, educación y habilidades en una interfaz limpia y minimalista.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-12 w-12 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">IA Ready</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Infraestructura lista para integrar análisis profundo con LLMs y optimización de contenido.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm border-t">
        © 2024 cvOS. Built with Next.js, FastAPI & Love.
      </footer>
    </div>
  )
}
