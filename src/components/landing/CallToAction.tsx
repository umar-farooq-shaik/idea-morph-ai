
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="text-center py-20 sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to turn your idea into a startup?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Free forever. No signup required. Get started in seconds and see your vision come to life.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link to="/app">Try Cofounder AI Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
