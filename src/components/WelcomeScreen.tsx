import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function WelcomeScreen() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 animate-fade-in">
            <div className="max-w-3xl mx-auto text-center">
                {/* Logo/Icon */}
                <div className="relative mx-auto w-24 h-24 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Code className="h-12 w-12 text-primary" />
                    </div>
                </div>

                {/* Welcome Text - Using padding instead of margin */}
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent pb-16">
                    Welcome to Snippify
                </h1>

                {/* Paragraph with explicit spacing */}
                <div className="mb-16">
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your personal collection of code snippets for faster, more efficient development.
                        Browse languages, explore categories, or search for exactly what you need.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <FeatureCard
                        title="Browse Languages"
                        description="Explore snippets organized by programming language"
                        icon={<Code className="h-6 w-6" />}
                    />
                    <FeatureCard
                        title="Copy & Paste"
                        description="Quickly copy snippets to use in your projects"
                        icon={<Sparkles className="h-6 w-6" />}
                    />
                    <FeatureCard
                        title="Search"
                        description="Find exactly what you need with powerful search"
                        icon={<ChevronRight className="h-6 w-6" />}
                    />
                </div>

                {/* Call to action */}
                <div className="mt-12">
                    <p className="text-muted-foreground mb-4">
                        Get started by selecting a language from the sidebar
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                        <ChevronRight className="h-5 w-5 animate-bounce-horizontal" />
                        <span>Browse categories</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
    return (
        <div className="bg-card border rounded-lg p-6 transition-all hover:shadow-md hover:border-primary">
            <div className="p-2 rounded-md bg-primary/10 w-fit mb-4">
                {icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
        </div>
    );
}