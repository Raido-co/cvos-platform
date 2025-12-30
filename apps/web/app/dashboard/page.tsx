"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Briefcase, GraduationCap, Code, Terminal, Save, Eye, ArrowLeft, Check } from "lucide-react"

type ProfileData = {
    fullName: string
    title: string
    email: string
    phone: string
    summary: string
    experience: string
    education: string
    skills: string
}

export default function DashboardPage() {
    const router = useRouter()
    const [activeSection, setActiveSection] = useState<'profile' | 'experience' | 'education' | 'skills'>('profile')
    const [isSaved, setIsSaved] = useState(false)

    // State for Profile Data
    const [formData, setFormData] = useState<ProfileData>({
        fullName: "",
        title: "",
        email: "",
        phone: "",
        summary: "",
        experience: "",
        education: "",
        skills: ""
    })

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("cvos_profile")
        if (savedData) {
            setFormData(JSON.parse(savedData))
        }
    }, [])

    const handleInputChange = (field: keyof ProfileData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        setIsSaved(false)
    }

    const handleSave = () => {
        localStorage.setItem("cvos_profile", JSON.stringify(formData))
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <Card className="bg-card border-border shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                        <CardHeader className="border-b border-border bg-muted/20">
                            <CardTitle className="font-mono text-lg flex items-center gap-2">
                                <span className="text-blue-400">#</span> identity_config
                            </CardTitle>
                            <CardDescription>Basic contact information and professional headline.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 pt-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-mono text-muted-foreground uppercase">full_name</Label>
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        className="bg-secondary border-border focus:border-primary font-mono"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xs font-mono text-muted-foreground uppercase">job_title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Senior DevOps Engineer"
                                        className="bg-secondary border-border focus:border-primary font-mono"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-mono text-muted-foreground uppercase">email_address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@raido.io"
                                        className="bg-secondary border-border focus:border-primary font-mono"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-mono text-muted-foreground uppercase">phone_number</Label>
                                    <Input
                                        id="phone"
                                        placeholder="+1 (555) 000-0000"
                                        className="bg-secondary border-border focus:border-primary font-mono"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-xs font-mono text-muted-foreground uppercase">professional_summary</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Experienced engineer with a focus on automation and cloud infrastructure..."
                                    className="min-h-[120px] bg-secondary border-border focus:border-primary font-mono"
                                    value={formData.summary}
                                    onChange={(e) => handleInputChange('summary', e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground text-right font-mono">{formData.summary.length}/500 chars</p>
                            </div>
                        </CardContent>
                    </Card>
                )
            case 'experience':
                return (
                    <Card className="bg-card border-border shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                        <CardHeader className="border-b border-border bg-muted/20">
                            <CardTitle className="font-mono text-lg flex items-center gap-2">
                                <span className="text-blue-400">#</span> experience.log
                            </CardTitle>
                            <CardDescription>Work history and key achievements.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Textarea
                                className="min-h-[300px] bg-secondary border-border focus:border-primary font-mono"
                                placeholder="- Position: Software Engineer&#10;- Company: Tech Corp&#10;- Date: 2020-Present&#10;- Achievement: Reduced latency by 40%"
                                value={formData.experience}
                                onChange={(e) => handleInputChange('experience', e.target.value)}
                            />
                        </CardContent>
                    </Card>
                )
            case 'education':
                return (
                    <Card className="bg-card border-border shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                        <CardHeader className="border-b border-border bg-muted/20">
                            <CardTitle className="font-mono text-lg flex items-center gap-2">
                                <span className="text-yellow-400">#</span> education.md
                            </CardTitle>
                            <CardDescription>Academic background and certifications.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Textarea
                                className="min-h-[300px] bg-secondary border-border focus:border-primary font-mono"
                                placeholder="- Degree: BS Computer Science&#10;- School: University of Tech&#10;- Year: 2019"
                                value={formData.education}
                                onChange={(e) => handleInputChange('education', e.target.value)}
                            />
                        </CardContent>
                    </Card>
                )
            case 'skills':
                return (
                    <Card className="bg-card border-border shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
                        <CardHeader className="border-b border-border bg-muted/20">
                            <CardTitle className="font-mono text-lg flex items-center gap-2">
                                <span className="text-green-400">#</span> skills.ts
                            </CardTitle>
                            <CardDescription>Technical stack and languages.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Textarea
                                className="min-h-[300px] bg-secondary border-border focus:border-primary font-mono"
                                placeholder="JavaScript, Python, Docker, Kubernetes, AWS, Terraform..."
                                value={formData.skills}
                                onChange={(e) => handleInputChange('skills', e.target.value)}
                            />
                        </CardContent>
                    </Card>
                )
        }
    }

    return (
        <div className="flex min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
            {/* Sidebar */}
            <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col">
                <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono font-bold text-xl text-primary tracking-tighter cursor-pointer" onClick={() => router.push('/')}>
                        <Terminal className="h-5 w-5" />
                        <span>cvOS</span>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <p className="px-2 text-xs font-mono text-muted-foreground mb-2 mt-2 uppercase tracking-widest">Explorer</p>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${activeSection === 'profile' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'}`}
                        onClick={() => setActiveSection('profile')}
                    >
                        <User className="mr-3 h-4 w-4 text-purple-400" /> profile.json
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${activeSection === 'experience' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'}`}
                        onClick={() => setActiveSection('experience')}
                    >
                        <Briefcase className="mr-3 h-4 w-4 text-blue-400" /> experience.log
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${activeSection === 'education' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'}`}
                        onClick={() => setActiveSection('education')}
                    >
                        <GraduationCap className="mr-3 h-4 w-4 text-yellow-400" /> education.md
                    </Button>
                    <Button
                        variant="ghost"
                        className={`w-full justify-start font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${activeSection === 'skills' ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-sidebar-foreground'}`}
                        onClick={() => setActiveSection('skills')}
                    >
                        <Code className="mr-3 h-4 w-4 text-green-400" /> skills.ts
                    </Button>
                </nav>

                <div className="p-4 border-t border-sidebar-border">
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary mb-4" onClick={() => router.push('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Exit to Root
                    </Button>
                    <div className="text-xs text-muted-foreground font-mono">
                        user: developer@raido.io<br />
                        env: production
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8 pb-6 border-b border-border">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground font-mono flex items-center gap-2">
                            <span className="text-primary">~/</span>user-{activeSection}
                        </h1>
                        <p className="text-muted-foreground mt-1">Configure your core professional metadata.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="font-mono border-primary/20 hover:border-primary/50">
                            <Eye className="mr-2 h-4 w-4" /> Preview
                        </Button>
                        <Button
                            className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                            onClick={handleSave}
                        >
                            {isSaved ? <Check className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
                            {isSaved ? "Committed" : "Commit Changes"}
                        </Button>
                    </div>
                </header>

                <div className="max-w-4xl space-y-6">
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}
