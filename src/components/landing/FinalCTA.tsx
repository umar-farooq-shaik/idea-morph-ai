
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 sm:py-24">
      <div className="container mx-auto px-4 text-center">
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
    </section>
  );
};

export default FinalCTA;
