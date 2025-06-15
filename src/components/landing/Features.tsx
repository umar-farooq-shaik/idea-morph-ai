
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Medal, Search, Users, GitMerge, FileText, Landmark, Lightbulb, Briefcase, MessageSquare, Map, GaugeCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const featuresList: { title: string; icon: LucideIcon }[] = [
    { title: "Idea Validation", icon: CheckCircle },
    { title: "Founder Fit", icon: Medal },
    { title: "Competitor Scan", icon: Search },
    { title: "Target Audience", icon: Users },
    { title: "Problem–Solution Fit", icon: GitMerge },
    { title: "Roadmap", icon: Map },
    { title: "Documents You Need", icon: FileText },
    { title: "Funding Strategy", icon: Landmark },
    { title: "Name & Domain Suggestions", icon: Lightbulb },
    { title: "Business Model", icon: Briefcase },
    { title: "Chatbot FAQ Setup", icon: MessageSquare },
    { title: "Execution Score", icon: GaugeCircle },
];

const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What You Get – 12 AI-Generated Sections</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete, expert-level business plan covering every critical area of your startup.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuresList.map((feature) => (
            <Card key={feature.title} className="bg-card shadow-md hover:shadow-lg transition-shadow border-border">
              <CardContent className="p-6 flex items-center gap-4">
                <feature.icon className="h-6 w-6 text-accent" />
                <span className="font-semibold text-foreground">{feature.title}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
