
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import IdeaForm from '@/components/cofounder/IdeaForm';
import ResultsDisplay from '@/components/cofounder/ResultsDisplay';
import sampleData from '@/data/sample-response.json';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './../components/AppSidebar';

// Define the type for the AI response
export type CofounderResponse = typeof sampleData;

const Index = () => {
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<CofounderResponse | null>(null);

  const handleSubmit = (submittedIdea: string) => {
    setIdea(submittedIdea);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse(sampleData);
      setIsLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setIdea('');
    setResponse(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground w-full flex">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="container mx-auto p-4 md:p-8 flex-1">
            {response ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-muted-foreground">Your Startup Blueprint for: <span className="text-foreground">{idea}</span></h2>
                  <Button onClick={handleReset} variant="outline">Start Over</Button>
                </div>
                <ResultsDisplay response={response} />
              </div>
            ) : (
              <div className="max-w-3xl mx-auto text-center">
                {isLoading ? (
                  <div>
                    <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary" />
                    <p className="mt-4 text-lg text-muted-foreground">Your AI Cofounder is building your startup plan...</p>
                  </div>
                ) : (
                  <IdeaForm onSubmit={handleSubmit} />
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
