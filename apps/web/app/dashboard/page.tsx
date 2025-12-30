"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Terminal, ArrowLeft, ArrowRight, Plus, Trash2, Check, Download, ChevronRight, Briefcase, GraduationCap, Award, User as UserIcon } from "lucide-react"

// Types
type Education = {
    id: string
    institution: string
    degree: string
    location: string
    startDate: string
    endDate: string
    description: string
}

type Experience = {
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    description: string
}

type Certification = {
    id: string
    name: string
    issuer: string
    date: string
}

type ProfileData = {
    fullName: string
    title: string
    email: string
    phone: string
    location: string
    website: string
    github: string
    gitlab: string
    summary: string
    education: Education[]
    experience: Experience[]
    skills: string
    languages: string
    certifications: Certification[]
    interests: string
}

const steps = [
    { id: 'personal', title: 'Personal Info', icon: UserIcon },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'skills', title: 'Skills & Certs', icon: Award },
    { id: 'preview', title: 'Preview', icon: Check }
]

export default function DashboardPage() {
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)

    // Initial State
    const [formData, setFormData] = useState<ProfileData>({
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        github: "",
        gitlab: "",
        summary: "",
        education: [],
        experience: [],
        skills: "",
        languages: "",
        certifications: [],
        interests: ""
    })

    // Load from LocalStorage
    useEffect(() => {
        const savedData = localStorage.getItem("cvos_profile_wizard")
        if (savedData) {
            setFormData(JSON.parse(savedData))
        }
    }, [])

    // Save to LocalStorage on change
    useEffect(() => {
        localStorage.setItem("cvos_profile_wizard", JSON.stringify(formData))
    }, [formData])

    // Navigation Handlers
    const nextStep = () => setCurrentStep(p => Math.min(steps.length - 1, p + 1))
    const prevStep = () => setCurrentStep(p => Math.max(0, p - 1))

    // Form Handlers
    const updateField = (field: keyof ProfileData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    // Array Item Handlers (Generic)
    const addItem = <T extends { id: string }>(field: keyof ProfileData, newItem: T) => {
        setFormData(prev => {
            const currentList = prev[field]
            if (Array.isArray(currentList)) {
                return {
                    ...prev,
                    [field]: [...currentList, newItem]
                }
            }
            return prev
        })
    }

    const removeItem = (field: keyof ProfileData, id: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: (prev[field] as any[]).filter((item: any) => item.id !== id)
        }))
    }

    const updateItem = (field: keyof ProfileData, id: string, key: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: (prev[field] as any[]).map((item: any) =>
                item.id === id ? { ...item, [key]: value } : item
            )
        }))
    }

    // --- RENDERERS ---

    const renderProgressBar = () => (
        <div className="w-full bg-secondary/50 h-2 rounded-full mb-8 overflow-hidden flex">
            {steps.map((step, idx) => (
                <div
                    key={step.id}
                    className={`h-full flex-1 transition-all duration-300 ${idx <= currentStep ? 'bg-primary' : 'bg-transparent'}`}
                />
            ))}
        </div>
    )

    const renderPersonalStep = () => (
        <Card className="border-border shadow-lg">
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Tell us about yourself.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input value={formData.fullName} onChange={e => updateField('fullName', e.target.value)} placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                        <Label>Professional Title</Label>
                        <Input value={formData.title} onChange={e => updateField('title', e.target.value)} placeholder="DevOps Engineer" />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+1 234 567 890" />
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>Location</Label>
                        <Input value={formData.location} onChange={e => updateField('location', e.target.value)} placeholder="New York, USA" />
                    </div>
                    <div className="space-y-2">
                        <Label>GitHub URL</Label>
                        <Input value={formData.github} onChange={e => updateField('github', e.target.value)} placeholder="github.com/username" />
                    </div>
                    <div className="space-y-2">
                        <Label>LinkedIn/Website</Label>
                        <Input value={formData.website} onChange={e => updateField('website', e.target.value)} placeholder="linkedin.com/in/username" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Professional Summary</Label>
                    <Textarea
                        value={formData.summary}
                        onChange={e => updateField('summary', e.target.value)}
                        placeholder="Brief summary of your career and goals..."
                        className="min-h-[100px]"
                    />
                </div>
            </CardContent>
        </Card>
    )

    const renderEducationStep = () => (
        <div className="space-y-6">
            <Card className="border-border shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Education</CardTitle>
                        <CardDescription>Add your academic background found.</CardDescription>
                    </div>
                    <Button onClick={() => addItem('education', {
                        id: crypto.randomUUID(), institution: '', degree: '', location: '', startDate: '', endDate: '', description: ''
                    })}>
                        <Plus className="h-4 w-4 mr-2" /> Add Education
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {formData.education.length === 0 && (
                        <div className="text-center text-muted-foreground py-8 border-2 border-dashed border-border rounded-lg">
                            No education entries yet. Click "Add Education" to start.
                        </div>
                    )}
                    {formData.education.map((edu, index) => (
                        <div key={edu.id} className="p-4 border border-border rounded-lg bg-secondary/20 relative group">
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeItem('education', edu.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <h4 className="font-mono text-xs uppercase text-primary mb-4">Education #{index + 1}</h4>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <Label>Institution</Label>
                                    <Input value={edu.institution} onChange={e => updateItem('education', edu.id, 'institution', e.target.value)} placeholder="University Name" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Degree</Label>
                                    <Input value={edu.degree} onChange={e => updateItem('education', edu.id, 'degree', e.target.value)} placeholder="Bachelor of Science" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input value={edu.location} onChange={e => updateItem('education', edu.id, 'location', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Start Date</Label>
                                    <Input value={edu.startDate} onChange={e => updateItem('education', edu.id, 'startDate', e.target.value)} placeholder="YYYY-MM" />
                                </div>
                                <div className="space-y-2">
                                    <Label>End Date</Label>
                                    <Input value={edu.endDate} onChange={e => updateItem('education', edu.id, 'endDate', e.target.value)} placeholder="YYYY-MM or Present" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Description/Achievements</Label>
                                <Textarea value={edu.description} onChange={e => updateItem('education', edu.id, 'description', e.target.value)} placeholder="Key coursework, honors, etc." />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )

    const renderExperienceStep = () => (
        <div className="space-y-6">
            <Card className="border-border shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Professional Experience</CardTitle>
                        <CardDescription>Focus on achievements and quantifiable results.</CardDescription>
                    </div>
                    <Button onClick={() => addItem('experience', {
                        id: crypto.randomUUID(), company: '', position: '', location: '', startDate: '', endDate: '', description: ''
                    })}>
                        <Plus className="h-4 w-4 mr-2" /> Add Experience
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    {formData.experience.length === 0 && (
                        <div className="text-center text-muted-foreground py-8 border-2 border-dashed border-border rounded-lg">
                            No experience entries yet. Click "Add Experience" to start.
                        </div>
                    )}
                    {formData.experience.map((exp, index) => (
                        <div key={exp.id} className="p-4 border border-border rounded-lg bg-secondary/20 relative group">
                            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeItem('experience', exp.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <h4 className="font-mono text-xs uppercase text-primary mb-4">Experience #{index + 1}</h4>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <Label>Company</Label>
                                    <Input value={exp.company} onChange={e => updateItem('experience', exp.id, 'company', e.target.value)} placeholder="Tech Corp" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Position</Label>
                                    <Input value={exp.position} onChange={e => updateItem('experience', exp.id, 'position', e.target.value)} placeholder="Senior Developer" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="space-y-2">
                                    <Label>Location</Label>
                                    <Input value={exp.location} onChange={e => updateItem('experience', exp.id, 'location', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Start Date</Label>
                                    <Input value={exp.startDate} onChange={e => updateItem('experience', exp.id, 'startDate', e.target.value)} placeholder="YYYY-MM" />
                                </div>
                                <div className="space-y-2">
                                    <Label>End Date</Label>
                                    <Input value={exp.endDate} onChange={e => updateItem('experience', exp.id, 'endDate', e.target.value)} placeholder="YYYY-MM or Present" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Responsibilities & Achievements</Label>
                                <div className="text-xs text-muted-foreground mb-2">Use bullet points (•) for better ATS readability.</div>
                                <Textarea
                                    value={exp.description}
                                    onChange={e => updateItem('experience', exp.id, 'description', e.target.value)}
                                    placeholder="• Reduced latency by 50%...&#10;• Led a team of 5 engineers..."
                                    className="min-h-[150px] font-mono text-sm leading-relaxed"
                                />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )

    const renderSkillsStep = () => (
        <Card className="border-border shadow-lg">
            <CardHeader>
                <CardTitle>Skills & Certifications</CardTitle>
                <CardDescription>List technical competencies and credentials.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="space-y-2">
                    <Label>Technical Skills (Comma Separated)</Label>
                    <Textarea
                        value={formData.skills}
                        onChange={e => updateField('skills', e.target.value)}
                        placeholder="JavaScript, React, Python, Docker, Kubernetes, AWS..."
                    />
                </div>
                <div className="space-y-2">
                    <Label>Languages</Label>
                    <Input
                        value={formData.languages}
                        onChange={e => updateField('languages', e.target.value)}
                        placeholder="English (Native), Spanish (C2)..."
                    />
                </div>
                <div className="space-y-2">
                    <Label>Certifications & Licenses</Label>
                    <div className="flex justify-end mb-2">
                        <Button size="sm" variant="outline" onClick={() => addItem('certifications', { id: crypto.randomUUID(), name: '', issuer: '', date: '' })}>
                            <Plus className="h-3 w-3 mr-1" /> Add Cert
                        </Button>
                    </div>
                    {formData.certifications.length === 0 && (
                        <p className="text-sm text-muted-foreground italic">No certifications listed.</p>
                    )}
                    {formData.certifications.map(cert => (
                        <div key={cert.id} className="flex gap-2 items-center">
                            <Input value={cert.name} onChange={e => updateItem('certifications', cert.id, 'name', e.target.value)} placeholder="Certification Name" className="flex-[2]" />
                            <Input value={cert.issuer} onChange={e => updateItem('certifications', cert.id, 'issuer', e.target.value)} placeholder="Issuer" className="flex-1" />
                            <Input value={cert.date} onChange={e => updateItem('certifications', cert.id, 'date', e.target.value)} placeholder="Year" className="w-24" />
                            <Button variant="ghost" size="icon" onClick={() => removeItem('certifications', cert.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="space-y-2">
                    <Label>Additional Interests</Label>
                    <Input value={formData.interests} onChange={e => updateField('interests', e.target.value)} placeholder="Open Source Contributing, Tech Writing..." />
                </div>
            </CardContent>
        </Card>
    )

    const renderPreviewStep = () => (
        <Card className="border-border shadow-lg bg-muted/20">
            <CardHeader>
                <CardTitle>Review & Export</CardTitle>
                <CardDescription>Verify your information before generating the CV.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 font-mono text-sm">
                <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                    <h1 className="text-2xl font-bold text-primary mb-1">{formData.fullName}</h1>
                    <p className="text-lg text-foreground mb-4">{formData.title}</p>
                    <div className="text-muted-foreground space-y-1 text-xs mb-6">
                        <p>{formData.email} | {formData.phone}</p>
                        <p>{formData.location}</p>
                        <div className="flex gap-4">
                            {formData.github && <span>GH: {formData.github}</span>}
                            {formData.website && <span>WEB: {formData.website}</span>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <section>
                            <h3 className="text-lg font-bold border-b border-primary/30 pb-1 mb-2">Summary</h3>
                            <p className="whitespace-pre-wrap">{formData.summary}</p>
                        </section>

                        <section>
                            <h3 className="text-lg font-bold border-b border-primary/30 pb-1 mb-2">Experience</h3>
                            {formData.experience.map(exp => (
                                <div key={exp.id} className="mb-4">
                                    <div className="flex justify-between font-bold">
                                        <span>{exp.position} at {exp.company}</span>
                                        <span>{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-1">{exp.location}</p>
                                    <p className="whitespace-pre-wrap pl-2 border-l-2 border-primary/10">{exp.description}</p>
                                </div>
                            ))}
                        </section>

                        <section>
                            <h3 className="text-lg font-bold border-b border-primary/30 pb-1 mb-2">Education</h3>
                            {formData.education.map(edu => (
                                <div key={edu.id} className="mb-2">
                                    <div className="flex justify-between font-bold">
                                        <span>{edu.institution}</span>
                                        <span>{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <p>{edu.degree}</p>
                                    <p className="text-xs text-muted-foreground">{edu.location}</p>
                                </div>
                            ))}
                        </section>

                        <section>
                            <h3 className="text-lg font-bold border-b border-primary/30 pb-1 mb-2">Skills</h3>
                            <p>{formData.skills}</p>
                        </section>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl">
                        <Download className="mr-2 h-5 w-5" /> Download PDF (Generate)
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        * PDF Generation connects to the Python backend (WeasyPrint)
                    </p>
                </div>
            </CardContent>
        </Card>
    )

    // Main Render
    return (
        <div className="flex min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
            {/* Minimal Sidebar for context */}
            <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col">
                <div className="p-6 border-b border-sidebar-border flex items-center gap-2 font-mono font-bold text-xl text-primary tracking-tighter cursor-pointer" onClick={() => router.push('/')}>
                    <Terminal className="h-5 w-5" />
                    <span>cvOS</span>
                </div>
                <div className="p-4 space-y-2">
                    {steps.map((step, idx) => (
                        <div
                            key={step.id}
                            onClick={() => setCurrentStep(idx)}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${idx === currentStep ? 'bg-sidebar-accent text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            <step.icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{step.title}</span>
                            {idx < currentStep && <Check className="h-3 w-3 ml-auto text-green-500" />}
                        </div>
                    ))}
                </div>
                <div className="mt-auto p-4 border-t border-sidebar-border">
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={() => router.push('/')}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Exit
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold font-mono tracking-tight text-foreground">CV_Wizard_Setup</h1>
                            <p className="text-muted-foreground">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
                                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
                            </Button>
                            <Button onClick={nextStep} disabled={currentStep === steps.length - 1} className={currentStep === steps.length - 1 ? 'hidden' : ''}>
                                Next <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {renderProgressBar()}

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {currentStep === 0 && renderPersonalStep()}
                        {currentStep === 1 && renderEducationStep()}
                        {currentStep === 2 && renderExperienceStep()}
                        {currentStep === 3 && renderSkillsStep()}
                        {currentStep === 4 && renderPreviewStep()}
                    </div>

                    <div className="mt-8 flex justify-between pt-6 border-t border-border">
                        <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0} className="text-muted-foreground">
                            Back
                        </Button>
                        {currentStep < steps.length - 1 && (
                            <Button onClick={nextStep}>
                                Continue <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
