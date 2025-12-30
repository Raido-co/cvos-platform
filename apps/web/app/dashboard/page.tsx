import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Briefcase, GraduationCap, Code, Terminal, Save, Eye } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="flex min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
            {/* Sidebar */}
            <aside className="w-64 bg-sidebar border-r border-sidebar-border hidden md:flex flex-col">
                <div className="p-6 border-b border-sidebar-border">
                    <div className="flex items-center gap-2 font-mono font-bold text-xl text-primary tracking-tighter">
                        <Terminal className="h-5 w-5" />
                        <span>cvOS</span>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    <p className="px-2 text-xs font-mono text-muted-foreground mb-2 mt-2 uppercase tracking-widest">Explorer</p>
                    <Button variant="ghost" className="w-full justify-start font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <User className="mr-3 h-4 w-4 text-purple-400" /> profile.json
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Briefcase className="mr-3 h-4 w-4 text-blue-400" /> experience.log
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <GraduationCap className="mr-3 h-4 w-4 text-yellow-400" /> education.md
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Code className="mr-3 h-4 w-4 text-green-400" /> skills.ts
                    </Button>
                </nav>
                <div className="p-4 border-t border-sidebar-border">
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
                            <span className="text-primary">~/</span>user-profile
                        </h1>
                        <p className="text-muted-foreground mt-1">Configure your core professional metadata.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="font-mono border-primary/20 hover:border-primary/50">
                            <Eye className="mr-2 h-4 w-4" /> Preview
                        </Button>
                        <Button className="font-mono bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                            <Save className="mr-2 h-4 w-4" /> Commit Changes
                        </Button>
                    </div>
                </header>

                <div className="max-w-4xl space-y-6">
                    <Card className="bg-card border-border shadow-2xl">
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
                                    <Input id="name" placeholder="John Doe" className="bg-secondary border-border focus:border-primary font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xs font-mono text-muted-foreground uppercase">job_title</Label>
                                    <Input id="title" placeholder="Senior DevOps Engineer" className="bg-secondary border-border focus:border-primary font-mono" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-mono text-muted-foreground uppercase">email_address</Label>
                                    <Input id="email" type="email" placeholder="john@raido.io" className="bg-secondary border-border focus:border-primary font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-xs font-mono text-muted-foreground uppercase">phone_number</Label>
                                    <Input id="phone" placeholder="+1 (555) 000-0000" className="bg-secondary border-border focus:border-primary font-mono" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-xs font-mono text-muted-foreground uppercase">professional_summary</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Experienced engineer with a focus on automation and cloud infrastructure..."
                                    className="min-h-[120px] bg-secondary border-border focus:border-primary font-mono"
                                />
                                <p className="text-xs text-muted-foreground text-right font-mono">0/500 chars</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
