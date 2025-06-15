
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
    <section id="try-it-out" className="py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">Have an idea?</CardTitle>
            <CardDescription className="mt-2 text-lg">
              Describe your startup idea below and let our AI generate a business plan for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Textarea
                placeholder="e.g., A platform for connecting local gardeners with people who want fresh produce."
                className="min-h-[120px] text-base"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
              />
              <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Generate My Business Plan
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default IdeaFormSection;
