import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileCheck, Layout, Zap, Terminal, Code2, Cpu } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="px-6 h-16 flex items-center border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mr-8 flex items-center gap-2 font-mono font-bold text-xl text-primary md:text-2xl tracking-tighter">
          <Terminal className="h-6 w-6" />
          <span>cvOS</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/checker" className="hover:text-primary transition-colors duration-200">Checking</Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors duration-200">Dashboard</Link>
        </nav>
        <div className="ml-auto flex gap-4">
          <Link href="/checker">
            <Button className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              Initialize_CV <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />

        {/* Hero Section */}
        <section className="py-24 px-6 text-center max-w-5xl mx-auto z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-mono mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v1.0.0 Stable Release
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 font-sans">
            Recruiting Logic, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Decompiled.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Reverse engineer the hiring process. Analyze your resume against ATS algorithms and optimize with AI-driven insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <Link href="/checker" className="w-full">
              <Button size="lg" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 font-mono shadow-xl shadow-primary/20 border border-primary/20">
                <Code2 className="mr-2 h-5 w-5" /> Run Diagnostics
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full">
              <Button size="lg" variant="outline" className="w-full h-14 text-lg bg-background/50 backdrop-blur border-border hover:bg-accent/50 hover:text-accent-foreground font-mono">
                Open Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-border/40 flex items-center justify-center gap-8 text-muted-foreground/50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest">Powered By</span>
              <span className="text-lg font-bold text-foreground">RAIDO</span>
            </div>
          </div>
        </section>

        {/* Features Window */}
        <section className="w-full max-w-6xl mx-auto px-6 pb-24">
          <div className="rounded-xl border border-border bg-card/50 backdrop-blur shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs font-mono text-muted-foreground ml-2">~/cvos/features/manifest.json</div>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-8">
              <div className="group p-4 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-primary/20">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold font-mono mb-2 text-foreground">ATS_Parser</h3>
                <p className="text-sm text-muted-foreground">
                  Heuristic analysis engine that decodes PDF structures to verify machine-readability.
                </p>
              </div>

              <div className="group p-4 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-primary/20">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Layout className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold font-mono mb-2 text-foreground">Layout_Engine</h3>
                <p className="text-sm text-muted-foreground">
                  Server-side rendering (WeasyPrint) to generate Harvard-standard standardized documents.
                </p>
              </div>

              <div className="group p-4 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-primary/20">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold font-mono mb-2 text-foreground">Gemini_Core</h3>
                <p className="text-sm text-muted-foreground">
                  Integrated LLM analysis for deep semantic evaluation of professional experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 border-t border-border bg-muted/20">
        <div className="container mx-auto px-6 flex justify-between items-center text-xs text-muted-foreground font-mono">
          <span>© 2024 cvOS Platform.</span>
          <div className="flex items-center gap-2">
            <span>System Status:</span>
            <span className="text-green-500">● Operational</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
