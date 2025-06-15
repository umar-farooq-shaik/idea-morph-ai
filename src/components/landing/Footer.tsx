
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">Cofounder<span className="text-accent">AI</span></span>
            <span className="text-muted-foreground text-sm ml-4 hidden sm:inline">Smarter Startups Begin Here.</span>
          </div>
          <div className="flex gap-6 text-muted-foreground text-sm">
            <Link to="#" className="hover:text-primary hover:underline">About</Link>
            <Link to="#" className="hover:text-primary hover:underline">Privacy</Link>
            <Link to="#" className="hover:text-primary hover:underline">Contact</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground text-xs">
          © {new Date().getFullYear()} Cofounder AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
