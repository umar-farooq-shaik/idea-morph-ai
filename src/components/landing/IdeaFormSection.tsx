
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
    <section id="idea-form" className="container mx-auto px-4 py-20 sm:py-24">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Have an idea?</CardTitle>
          <CardDescription className="text-center text-muted-foreground text-lg">
            Describe it below and let our AI do the heavy lifting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Textarea
              placeholder="e.g., An AI-powered app that helps people learn new languages by chatting with virtual characters."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={4}
              className="text-base"
            />
            <Button type="submit" size="lg" disabled={!idea.trim()}>
              Generate My Startup Plan
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default IdeaFormSection;
