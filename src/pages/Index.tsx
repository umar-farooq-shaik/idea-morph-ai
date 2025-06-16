
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import IdeaForm from '@/components/cofounder/IdeaForm';
import ResultsDisplay from '@/components/cofounder/ResultsDisplay';
import sampleData from '@/data/sample-response.json';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Define the type for the AI response
export type CofounderResponse = typeof sampleData;

const Index = () => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<CofounderResponse | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (submittedIdea: string) => {
    if (isLoading) return;
    setIdea(submittedIdea);
    setResponse(null);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-blueprint', {
        body: { idea: submittedIdea },
      });

      if (error) throw error;
      
      // The function now returns a string, so we need to parse it.
      // Sometimes the AI might return a string that is not a valid JSON.
      // We will try to parse it, but if it fails, we will show an error.
      let parsedData;
      if (typeof data === 'string') {
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          console.error("Failed to parse AI response:", e);
          throw new Error("The AI returned an invalid response format. Please try again.");
        }
      } else {
        parsedData = data;
      }

      setResponse(parsedData);
    } catch (error: any) {
      console.error('Error generating blueprint:', error);
      toast.error('Failed to generate blueprint', {
        description: error.message || 'An unexpected error occurred. Please check the console and try again.',
      });
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIdea('');
    setResponse(null);
  };

  const handleBuildMVP = () => {
    navigate('/build-mvp', { state: { idea } });
  };

  useEffect(() => {
    const ideaFromUrl = searchParams.get('idea');
    if (ideaFromUrl && !isLoading && !response) {
      handleSubmit(ideaFromUrl);
      // Clean up URL
      searchParams.delete('idea');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background text-foreground w-full">
      <Header />

      <main className="container mx-auto p-4 md:p-8">
        {response ? (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
               <h2 className="text-2xl font-bold text-muted-foreground">Your Startup Blueprint for: <span className="text-foreground">{idea}</span></h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleReset} variant="outline">🔁 Start Over</Button>
                <Button 
                  onClick={handleBuildMVP} 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  🧱 Build MVP
                </Button>
              </div>
            </div>
            <ResultsDisplay response={response} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center">
            {isLoading ? (
              <div>
                <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
                <p className="mt-4 text-lg text-muted-foreground">IdeaMorph AI is building your startup plan...</p>
                <p className="mt-2 text-sm text-muted-foreground">This can take up to 30 seconds.</p>
              </div>
            ) : (
              <IdeaForm onSubmit={handleSubmit} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
