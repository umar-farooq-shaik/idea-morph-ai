
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'First-time Founder',
    quote: "Cofounder AI was a game-changer. It took my raw idea and structured it into a professional plan in minutes. It's like having a seasoned advisor on demand."
  },
  {
    name: 'Mike R.',
    role: 'Indie Hacker',
    quote: "I've built multiple small projects, but this tool helped me think through aspects I usually ignore, like competitor analysis and funding. Highly recommended."
  },
  {
    name: 'Jessica T.',
    role: 'Hackathon Winner',
    quote: "We used Cofounder AI for a weekend hackathon and it blew the judges away. The speed and quality of the output is just incredible. We won first place!"
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-secondary py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Loved by Founders Worldwide</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our users are saying.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="bg-card border-border shadow-lg relative">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4 relative text-base">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-card border-b border-r border-border transform rotate-45"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
