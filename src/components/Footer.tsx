import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-card border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left - Branding */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <span className="text-2xl">🍕</span>
              <span className="font-bold text-xl">Tree Bites</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built at Stanford 🌲 © 2025 Tree Bites
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex flex-wrap gap-6 text-sm">
            <a 
              href="#how-it-works" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#why-join" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Why Join
            </a>
            <a 
              href="#mission" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Mission
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
          </div>

          {/* Right - Social */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@treebites.app"
              className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
