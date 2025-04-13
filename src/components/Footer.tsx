import { Github, Heart, Code } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-6 px-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                            © {currentYear} Sampath Kumar
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Made with</span>
                        <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                        <span>by</span>
                        <span className="font-medium bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                            Sampath Kumar
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/sampathvenur/Snippify"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="GitHub Repository"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <Separator orientation="vertical" className="h-4" />
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}