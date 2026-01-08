"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, Github, Mail, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"
import { useState } from "react"

export default function LoginPage() {
    const { locale } = useLanguage()
    const [isLoading, setIsLoading] = useState<string | null>(null)

    const content = {
        es: {
            title: "Iniciar Sesión",
            subtitle: "Accede a tu cuenta para guardar tus CVs y desbloquear features premium",
            google: "Continuar con Google",
            github: "Continuar con GitHub",
            email: "Continuar con Email",
            noAccount: "¿No tienes cuenta?",
            register: "Regístrate gratis",
            terms: "Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad",
            back: "Volver al inicio",
            comingSoon: "¡Próximamente! Estamos trabajando en la autenticación."
        },
        en: {
            title: "Sign In",
            subtitle: "Access your account to save CVs and unlock premium features",
            google: "Continue with Google",
            github: "Continue with GitHub",
            email: "Continue with Email",
            noAccount: "Don't have an account?",
            register: "Sign up for free",
            terms: "By continuing, you agree to our Terms of Service and Privacy Policy",
            back: "Back to home",
            comingSoon: "Coming soon! We're working on authentication."
        },
        ru: {
            title: "Войти",
            subtitle: "Войдите в аккаунт для сохранения резюме и премиум функций",
            google: "Продолжить с Google",
            github: "Продолжить с GitHub",
            email: "Продолжить с Email",
            noAccount: "Нет аккаунта?",
            register: "Зарегистрируйтесь бесплатно",
            terms: "Продолжая, вы соглашаетесь с Условиями использования",
            back: "На главную",
            comingSoon: "Скоро! Мы работаем над аутентификацией."
        }
    }

    const t = content[locale as keyof typeof content] || content.en

    const handleAuth = (provider: string) => {
        setIsLoading(provider)
        // TODO: Implement actual auth with NextAuth
        setTimeout(() => {
            alert(t.comingSoon)
            setIsLoading(null)
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="px-4 md:px-6 h-16 flex items-center border-b border-border/40 bg-background/80 backdrop-blur-md">
                <Link href="/" className="mr-8 flex items-center gap-2 font-mono font-bold text-xl text-primary tracking-tighter">
                    <FileCheck className="h-6 w-6" />
                    <span>cvOS</span>
                </Link>
                <div className="ml-auto">
                    <LanguageSelector />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md space-y-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t.back}
                    </Link>

                    <Card className="border-border/60 shadow-2xl">
                        <CardHeader className="text-center space-y-2">
                            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                <FileCheck className="h-8 w-8 text-primary" />
                            </div>
                            <CardTitle className="text-2xl font-mono">{t.title}</CardTitle>
                            <CardDescription className="text-base">
                                {t.subtitle}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Google */}
                            <Button
                                variant="outline"
                                className="w-full h-12 text-base font-medium"
                                onClick={() => handleAuth('google')}
                                disabled={isLoading !== null}
                            >
                                {isLoading === 'google' ? (
                                    <span className="animate-spin mr-2">⏳</span>
                                ) : (
                                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                )}
                                {t.google}
                            </Button>

                            {/* GitHub */}
                            <Button
                                variant="outline"
                                className="w-full h-12 text-base font-medium"
                                onClick={() => handleAuth('github')}
                                disabled={isLoading !== null}
                            >
                                {isLoading === 'github' ? (
                                    <span className="animate-spin mr-2">⏳</span>
                                ) : (
                                    <Github className="mr-3 h-5 w-5" />
                                )}
                                {t.github}
                            </Button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">o</span>
                                </div>
                            </div>

                            {/* Email */}
                            <Button
                                variant="secondary"
                                className="w-full h-12 text-base font-medium"
                                onClick={() => handleAuth('email')}
                                disabled={isLoading !== null}
                            >
                                {isLoading === 'email' ? (
                                    <span className="animate-spin mr-2">⏳</span>
                                ) : (
                                    <Mail className="mr-3 h-5 w-5" />
                                )}
                                {t.email}
                            </Button>

                            {/* Terms */}
                            <p className="text-xs text-center text-muted-foreground mt-6">
                                {t.terms}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Register link */}
                    <p className="text-center text-sm text-muted-foreground">
                        {t.noAccount}{' '}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            {t.register}
                        </Link>
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center">
                <p className="text-xs text-muted-foreground font-mono">
                    cvOS © 2026 — Powered by{' '}
                    <a href="https://raido.com.co" target="_blank" rel="noopener" className="text-primary hover:underline">
                        Raido
                    </a>
                </p>
            </footer>
        </div>
    )
}
