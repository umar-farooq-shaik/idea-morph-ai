
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb } from 'lucide-react';

interface IdeaFormProps {
  onSubmit: (idea: string) => void;
}

const IdeaForm = ({ onSubmit }: IdeaFormProps) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label htmlFor="startup-idea" className="text-2xl font-bold block text-gray-200">
        Enter your startup idea
      </label>
      <Textarea
        id="startup-idea"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="e.g., An AI-powered meal planning app for busy families..."
        className="min-h-[150px] text-lg bg-secondary border-2 border-border focus:ring-primary focus:border-primary p-4"
      />
      <Button type="submit" size="lg" disabled={!idea.trim()} className="w-full md:w-auto">
        <Lightbulb className="mr-2 h-5 w-5" />
        Generate Blueprint
      </Button>
    </form>
  );
};

export default IdeaForm;
