
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BrainCircuit } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <BrainCircuit className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">Cofounder AI</span>
          </Link>
        </div>
        <nav>
          <Button asChild>
            <Link to="/app">Try Now</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
