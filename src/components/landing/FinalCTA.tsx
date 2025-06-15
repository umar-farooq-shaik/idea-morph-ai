import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const FinalCTA = () => {
  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 pt-16 pb-8 sm:pt-20 py-0">
        <div className="text-center py-[50px]">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to turn your idea into a startup?</h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Free forever. No signup required. Get started in seconds and see your vision come to life.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/app">Try Cofounder AI Now</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary-foreground/20 py-[12px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="font-bold">Cofounder<span className="text-accent">AI</span></span>
              <span className="text-primary-foreground/80 text-sm ml-4 hidden sm:inline">Smarter Startups Begin Here.</span>
            </div>
            <div className="flex gap-6 text-sm text-primary-foreground/80">
              <Link to="#" className="hover:text-primary-foreground hover:underline">About</Link>
              <Link to="#" className="hover:text-primary-foreground hover:underline">Privacy</Link>
              <Link to="#" className="hover:text-primary-foreground hover:underline">Contact</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Cofounder AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>;
};
export default FinalCTA;