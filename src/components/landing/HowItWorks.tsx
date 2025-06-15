
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, ListChecks, LayoutDashboard } from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: '1. Enter your startup idea',
    description: 'Describe your vision in a few sentences. Our AI analyzes the core concept.'
  },
  {
    icon: ListChecks,
    title: '2. AI breaks it into 12 sections',
    description: 'From validation to funding, we generate a complete business blueprint for you.'
  },
  {
    icon: LayoutDashboard,
    title: '3. Get your startup dashboard',
    description: 'Explore your personalized plan, simulate scenarios, and start executing.'
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-secondary py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get your comprehensive startup plan in three simple steps.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="bg-card text-center border-border">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="text-base mt-2">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
