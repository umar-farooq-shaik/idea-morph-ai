
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Download, Github, Rocket, RefreshCw, Plus } from 'lucide-react';
import Header from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type MVPResponse = {
  frontendCode: string;
  backendCode: string;
  databaseSchema: string;
  folderStructure: string;
};

const BuildMVP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mvpResponse, setMvpResponse] = useState<MVPResponse | null>(null);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [isAddingFeature, setIsAddingFeature] = useState(false);

  useEffect(() => {
    const ideaFromState = location.state?.idea;
    if (ideaFromState) {
      setIdea(ideaFromState);
    } else {
      // If no idea in state, redirect back to main app
      navigate('/app');
    }
  }, [location, navigate]);

  const generateMVP = async () => {
    if (!idea) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-mvp', {
        body: { idea },
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

      setMvpResponse(parsedData);
      // Add confetti effect
      toast.success('MVP Generated Successfully! 🎉', {
        description: 'Your MVP code is ready to download and deploy.',
      });
    } catch (error: any) {
      console.error('Error generating MVP:', error);
      toast.error('Failed to generate MVP', {
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addFeatureToMVP = async () => {
    if (!newFeature.trim() || !mvpResponse) return;
    
    setIsAddingFeature(true);
    try {
      const { data, error } = await supabase.functions.invoke('add-mvp-feature', {
        body: { 
          originalMVP: mvpResponse,
          newFeature: newFeature.trim(),
          idea 
        },
      });

      if (error) throw error;
      
      let parsedData;
      if (typeof data === 'string') {
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          console.error("Failed to parse feature response:", e);
          throw new Error("The AI returned an invalid response format. Please try again.");
        }
      } else {
        parsedData = data;
      }

      setMvpResponse(parsedData);
      setNewFeature('');
      setShowFeatureModal(false);
      toast.success('Feature Added Successfully! ✨', {
        description: 'Your MVP has been updated with the new feature.',
      });
    } catch (error: any) {
      console.error('Error adding feature:', error);
      toast.error('Failed to add feature', {
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsAddingFeature(false);
    }
  };

  const techStack = [
    { name: 'React', icon: '⚛️', color: 'from-blue-400 to-cyan-400' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-400 to-emerald-400' },
    { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-teal-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
      <Header />
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🧱 MVP Builder
            </h1>
            <p className="text-lg text-muted-foreground">
              We're turning your idea into real code.
            </p>
          </div>

          {/* Idea Summary Card */}
          <Card className="mb-8 border-2 border-purple-200 dark:border-purple-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                💡 Your Startup Idea
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-4 rounded-lg">
                {idea}
              </p>
            </CardContent>
          </Card>

          {/* Tech Stack Card */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>🛠️ Your MVP Tech Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {techStack.map((tech, index) => (
                  <div key={index} className={`bg-gradient-to-r ${tech.color} p-4 rounded-lg text-white text-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <div className="font-semibold">{tech.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Generate MVP Button */}
          {!mvpResponse && (
            <div className="text-center mb-8">
              <Button 
                onClick={generateMVP}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating MVP...
                  </>
                ) : (
                  <>
                    🚀 Generate MVP
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Results Section */}
          {mvpResponse && (
            <div className="space-y-6">
              <Card className="shadow-lg border-2 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="text-green-600 dark:text-green-400">
                    ✅ MVP Generated Successfully!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="frontend">
                      <AccordionTrigger className="text-lg font-semibold">
                        ⚛️ Frontend Code (React)
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{mvpResponse.frontendCode}</code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="backend">
                      <AccordionTrigger className="text-lg font-semibold">
                        🟢 Backend Code (Node.js)
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{mvpResponse.backendCode}</code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="database">
                      <AccordionTrigger className="text-lg font-semibold">
                        🍃 Database Schema (MongoDB)
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{mvpResponse.databaseSchema}</code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="structure">
                      <AccordionTrigger className="text-lg font-semibold">
                        📁 Folder Structure
                      </AccordionTrigger>
                      <AccordionContent>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{mvpResponse.folderStructure}</code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Export Section */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>📦 Export Your MVP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
                      <Download className="h-5 w-5" />
                      <div>
                        <div className="font-semibold">📥 Download ZIP</div>
                        <div className="text-sm text-muted-foreground">Get all files</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
                      <Github className="h-5 w-5" />
                      <div>
                        <div className="font-semibold">🛠 Export to GitHub</div>
                        <div className="text-sm text-muted-foreground">Create repository</div>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="flex items-center gap-2 p-4 h-auto">
                      <Rocket className="h-5 w-5" />
                      <div>
                        <div className="font-semibold">🚀 Deploy to Firebase</div>
                        <div className="text-sm text-muted-foreground">Live in minutes</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setMvpResponse(null)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  🔁 Regenerate MVP
                </Button>
                
                <Dialog open={showFeatureModal} onOpenChange={setShowFeatureModal}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                      <Plus className="h-4 w-4" />
                      ✏️ Add Features to MVP
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Feature</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <textarea
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Describe the feature you want to add (e.g., 'Add chat between users', 'Add payment system')"
                        className="w-full p-3 border rounded-lg min-h-[100px] resize-none"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowFeatureModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={addFeatureToMVP}
                          disabled={isAddingFeature || !newFeature.trim()}
                        >
                          {isAddingFeature ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            'Add Feature'
                          )}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BuildMVP;
