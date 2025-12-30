import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Briefcase, GraduationCap, Code } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-slate-900 border-r hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold tracking-tight text-indigo-600">cvOS</h2>
                </div>
                <nav className="space-y-1 px-4">
                    <Button variant="ghost" className="w-full justify-start font-medium text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800">
                        <User className="mr-3 h-4 w-4" /> Personal
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900">
                        <Briefcase className="mr-3 h-4 w-4" /> Experiencia
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900">
                        <GraduationCap className="mr-3 h-4 w-4" /> Educación
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900">
                        <Code className="mr-3 h-4 w-4" /> Habilidades
                    </Button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Editor de Perfil</h1>
                        <p className="text-slate-500">Mantén tu información actualizada para generar CVs perfectos.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Ver Vista Previa</Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">Guardar Cambios</Button>
                    </div>
                </header>

                <div className="max-w-4xl space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información Personal</CardTitle>
                            <CardDescription>Datos básicos de contacto y presentación.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input id="name" placeholder="Juan Pérez" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título Profesional</Label>
                                    <Input id="title" placeholder="Full Stack Developer" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="juan@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input id="phone" placeholder="+57 300 123 4567" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Perfil Profesional (Resumen)</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Desarrollador apasionado con 5 años de experiencia..."
                                    className="min-h-[100px]"
                                />
                                <p className="text-xs text-slate-500 text-right">0/500 caracteres</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
