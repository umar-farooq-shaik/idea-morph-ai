
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-bold">Cofounder<span className="text-accent">AI</span></span>
            <span className="text-muted-foreground text-sm ml-4 hidden sm:inline">Smarter Startups Begin Here.</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-primary hover:underline">About</Link>
            <Link to="#" className="hover:text-primary hover:underline">Privacy</Link>
            <Link to="#" className="hover:text-primary hover:underline">Contact</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cofounder AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FinalCTA;
