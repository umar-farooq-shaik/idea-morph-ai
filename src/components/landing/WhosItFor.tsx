
import { Card, CardContent } from '@/components/ui/card';
import { User, Users, Code, Building } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

const audiences: { title: string; icon: LucideIcon }[] = [
  { title: "First-time founders", icon: Users },
  { title: "Solo founders", icon: User },
  { title: "Hackathon builders", icon: Code },
  { title: "Startup incubators", icon: Building },
];

const WhosItFor = () => {
  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Perfect for...</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((audience) => (
            <Card key={audience.title} className="bg-card text-center border-border">
              <CardContent className="p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                  <audience.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="font-semibold text-lg text-foreground">{audience.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhosItFor;
