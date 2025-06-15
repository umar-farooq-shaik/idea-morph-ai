
import { Card } from '@/components/ui/card';

const audiences: { title: string }[] = [
  { title: "First-time founders" },
  { title: "Solo founders" },
  { title: "Hackathon builders" },
  { title: "Startup incubators" },
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
            <Card key={audience.title} className="bg-card text-center border-border p-8 flex items-center justify-center transition-all hover:shadow-xl hover:-translate-y-1">
              <p className="font-semibold text-lg text-foreground">{audience.title}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhosItFor;
