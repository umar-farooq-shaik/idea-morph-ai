
import { CheckCircle } from 'lucide-react';

const features = [
  "Idea Validation",
  "Founder-Fit Analysis",
  "Business Name & Domains",
  "Target Audience Personas",
  "Problem & Solution",
  "Competitor Scan",
  "Business Model Canvas",
  "Funding Strategy",
  "Execution Roadmap",
  "Legal Documents",
  "Marketing & Sales Plan",
  "Chatbot Simulation"
];

const Features = () => {
  return (
    <section className="bg-secondary py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Everything You Need to Launch</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From a spark of an idea to a full-fledged business blueprint.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-accent" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
