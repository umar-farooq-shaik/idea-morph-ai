
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Server, ShoppingBag, Wrench } from 'lucide-react';

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            AI-Powered Cofounder for Your Startup
          </h1>
          <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-lg text-muted-foreground md:text-xl">
            Validate your idea, get a 12-part execution plan, and start building — instantly.
          </p>
          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Button size="lg" asChild>
              <a href="#idea-form">
                Enter Your Idea
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-accent" />
              <span>SaaS</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-accent" />
              <span>Marketplace</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-accent" />
              <span>Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-accent" />
              <span>B2B</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="bg-secondary rounded-xl aspect-video w-full flex items-center justify-center">
            <p className="text-muted-foreground">Image/Lottie Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
