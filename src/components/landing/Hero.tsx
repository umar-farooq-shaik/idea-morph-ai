
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-20 text-center md:py-32">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        Turn your startup idea into a business blueprint.
      </h1>
      <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
        Cofounder AI leverages artificial intelligence to analyze your idea and generate everything you need to get started—from market analysis to a full-fledged business plan.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button size="lg" asChild>
          <Link to="/app">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
