
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const IdeaFormSection = () => {
  const [idea, setIdea] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      navigate(`/app?idea=${encodeURIComponent(idea.trim())}`);
    }
  };

  return (
    <section id="idea-form" className="bg-secondary py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto p-6 sm:p-8 border-border">
          <CardHeader className="text-center p-0 mb-6">
            <CardTitle className="text-3xl font-bold">Enter Your Idea</CardTitle>
            <CardDescription className="text-lg mt-2">Let's build your business blueprint. It's free and instant.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g., An AI-powered personal stylist for sustainable fashion..."
                className="min-h-[120px] text-base bg-card border-border focus:ring-primary focus:border-primary p-4"
              />
              <Button type="submit" size="lg" disabled={!idea.trim()} className="w-full">
                Generate My Cofounder
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IdeaFormSection;
