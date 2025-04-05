import { Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2" onClick={() => navigate('/')}>
                    <img src="/favicon.ico" alt="Snippify Logo" className="h-8 w-8" />
                    <span className="font-bold text-lg cursor-pointer bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Snippify
                    </span>
                </div>

                <div className="text-sm text-muted-foreground">
                    <p>A collection of useful code snippets for developers</p>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/sampathvenur/Snippify.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                    </a>
                    <span className="text-sm text-muted-foreground">
                        &copy; {currentYear} Snippify
                    </span>
                </div>
            </div>
        </footer>
    );
}