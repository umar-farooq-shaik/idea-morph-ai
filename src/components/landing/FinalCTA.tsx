
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-bold">IdeaMorph<span className="text-accent-foreground">AI</span></span>
            <span className="text-primary-foreground/70 text-sm ml-4 hidden sm:inline">Smarter Startups Begin Here.</span>
          </div>
          <div className="flex gap-6 text-sm text-primary-foreground/70">
            <Link to="#" className="hover:text-primary-foreground hover:underline">About</Link>
            <Link to="#" className="hover:text-primary-foreground hover:underline">Privacy</Link>
            <Link to="#" className="hover:text-primary-foreground hover:underline">Contact</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} IdeaMorph AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default FinalCTA;
