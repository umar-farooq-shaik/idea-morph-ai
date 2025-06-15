
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'First-time Founder',
    avatar: '/placeholder.svg',
    quote: "Cofounder AI was a game-changer. It took my raw idea and structured it into a professional plan in minutes. It's like having a seasoned advisor on demand."
  },
  {
    name: 'Mike R.',
    role: 'Indie Hacker',
    avatar: '/placeholder.svg',
    quote: "I've built multiple small projects, but this tool helped me think through aspects I usually ignore, like competitor analysis and funding. Highly recommended."
  },
  {
    name: 'Jessica T.',
    role: 'Hackathon Winner',
    avatar: '/placeholder.svg',
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
            <Card key={testimonial.name} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full mr-4 bg-muted" />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
