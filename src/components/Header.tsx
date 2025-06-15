
import { BrainCircuit } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const Header = () => {
  return (
    <header className="text-center mb-12 relative">
       <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      <div className="inline-flex items-center gap-3">
        <BrainCircuit className="h-10 w-10 text-foreground" />
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">
          Cofounder AI
        </h1>
      </div>
      <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
        Turn your startup idea into a comprehensive business blueprint, powered by AI.
      </p>
    </header>
  );
};

export default Header;
