
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Download, Eye, Code2 } from 'lucide-react';
import Header from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type MVPResponse = {
  landingPageCode: string;
  authSystemCode: string;
  databaseSchema: string;
  folderStructure: string;
};

const BuildMVP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mvpResponse, setMvpResponse] = useState<MVPResponse | null>(null);
  const [activeView, setActiveView] = useState<'preview' | 'code'>('preview');

  useEffect(() => {
    const ideaFromState = location.state?.idea;
    if (ideaFromState) {
      setIdea(ideaFromState);
      generateMVP(ideaFromState);
    } else {
      // If no idea in state, redirect back to main app
      navigate('/app');
    }
  }, [location, navigate]);

  const generateMVP = async (ideaText: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-mvp', {
        body: { idea: ideaText },
      });

      if (error) throw error;
      
      let parsedData;
      if (typeof data === 'string') {
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          console.error("Failed to parse MVP response:", e);
          throw new Error("The AI returned an invalid response format. Please try again.");
        }
      } else {
        parsedData = data;
      }

      // Map the response to our expected format
      setMvpResponse({
        landingPageCode: parsedData.frontendCode || parsedData.landingPageCode || '',
        authSystemCode: parsedData.backendCode || parsedData.authSystemCode || '',
        databaseSchema: parsedData.databaseSchema || '',
        folderStructure: parsedData.folderStructure || ''
      });

      toast.success('MVP Generated Successfully! 🎉');
    } catch (error: any) {
      console.error('Error generating MVP:', error);
      toast.error('Failed to generate MVP', {
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadZIP = () => {
    if (!mvpResponse) return;
    
    // Create a simple text file with all the code for now
    // In a real implementation, this would create a proper ZIP file
    const content = `
=== LANDING PAGE ===
${mvpResponse.landingPageCode}

=== AUTH SYSTEM ===
${mvpResponse.authSystemCode}

=== DATABASE SCHEMA ===
${mvpResponse.databaseSchema}

=== FOLDER STRUCTURE ===
${mvpResponse.folderStructure}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mvp-project.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Project files downloaded! 📥');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <Header />
      
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-200/50 dark:border-purple-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                🧱 MVP Builder
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={downloadZIP}
                disabled={!mvpResponse}
                variant="outline"
                className="bg-white/50 hover:bg-white/80 border-purple-200 text-purple-700 hover:text-purple-800"
              >
                <Download className="h-4 w-4 mr-2" />
                📥 Download ZIP
              </Button>
              
              <div className="flex bg-white/50 dark:bg-gray-800/50 rounded-lg p-1 border border-purple-200/50">
                <Button
                  onClick={() => setActiveView('preview')}
                  variant={activeView === 'preview' ? 'default' : 'ghost'}
                  size="sm"
                  className={activeView === 'preview' ? 'bg-purple-500 text-white' : 'text-purple-700 hover:text-purple-800'}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  🔍 Preview
                </Button>
                <Button
                  onClick={() => setActiveView('code')}
                  variant={activeView === 'code' ? 'default' : 'ghost'}
                  size="sm"
                  className={activeView === 'code' ? 'bg-purple-500 text-white' : 'text-purple-700 hover:text-purple-800'}
                >
                  <Code2 className="h-4 w-4 mr-1" />
                  </> Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Idea Summary */}
          <Card className="mb-6 border-2 border-purple-200 dark:border-purple-800 shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                💡 Your Startup Idea
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-4 rounded-lg">
                {idea}
              </p>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <Loader2 className="h-16 w-16 animate-spin mx-auto text-purple-500 mb-4" />
              <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-2">
                🚀 Building Your MVP...
              </h2>
              <p className="text-muted-foreground">
                Our AI is crafting your landing page, auth system, and database schema
              </p>
            </div>
          )}

          {/* Content Area */}
          {mvpResponse && !isLoading && (
            <div className="space-y-6">
              {activeView === 'preview' ? (
                <Card className="shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-green-600 dark:text-green-400">
                      🌟 Your MVP Landing Page Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                      <iframe
                        srcDoc={mvpResponse.landingPageCode}
                        className="w-full h-[600px] border-0"
                        title="MVP Preview"
                        sandbox="allow-same-origin"
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-blue-600 dark:text-blue-400">
                      📝 Your MVP Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="landing">
                        <AccordionTrigger className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                          🌐 Landing Page Code
                        </AccordionTrigger>
                        <AccordionContent>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
                            <code>{mvpResponse.landingPageCode}</code>
                          </pre>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="auth">
                        <AccordionTrigger className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                          🔐 Auth System Code
                        </AccordionTrigger>
                        <AccordionContent>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
                            <code>{mvpResponse.authSystemCode}</code>
                          </pre>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="database">
                        <AccordionTrigger className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                          🗃️ Database Schema
                        </AccordionTrigger>
                        <AccordionContent>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
                            <code>{mvpResponse.databaseSchema}</code>
                          </pre>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="structure">
                        <AccordionTrigger className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                          📁 Folder Structure
                        </AccordionTrigger>
                        <AccordionContent>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm border">
                            <code>{mvpResponse.folderStructure}</code>
                          </pre>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BuildMVP;
