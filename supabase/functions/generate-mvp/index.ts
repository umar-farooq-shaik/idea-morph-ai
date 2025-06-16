
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { idea } = await req.json();

    if (!idea) {
      throw new Error('Idea is required');
    }

    console.log('Generating MVP for idea:', idea);

    const prompt = `You are a senior full-stack software engineer.

From the following startup idea, generate a working MVP with the following features:

---

💡 Startup Idea:
"${idea}"

---

🎯 Requirements:

1. **Landing Page** (HTML or React)
   - Includes a hero section, features, about, and a CTA button
   - Responsive and clean design
   - Use modern CSS styling with gradients and animations

2. **Authentication**
   - Email/password signup and login
   - Use either Firebase Auth or Node.js + JWT (choose one)
   - Provide UI + backend logic

3. **Basic Database**
   - Design 3–4 data models relevant to the idea
   - Use MongoDB + Mongoose or Firebase Firestore (choose one)
   - Include sample schema definitions

4. **Folder Structure**
   - Show entire project layout:
     \`\`\`
     /frontend
       /components
       App.jsx
     /backend
       server.js
       /routes
     /database
       models/
     \`\`\`
   - Provide this as a Markdown tree

5. **Code Format**
   - Use Markdown headings:
     ## Landing Page
     ## Auth System
     ## Database
     ## Folder Structure

   - Make the code copy-paste ready. Do not explain unless asked.

Return as JSON with keys: frontendCode, backendCode, databaseSchema, folderStructure

Return only valid JSON, no explanations or markdown formatting.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;

    console.log('Generated text from Gemini:', generatedText);

    // Try to parse the response as JSON
    let mvpData;
    try {
      // Remove any markdown code blocks if present
      const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
      const parsedResponse = JSON.parse(cleanedText);
      
      // Handle nested structure from Gemini
      if (parsedResponse.frontendCode && typeof parsedResponse.frontendCode === 'object') {
        // If frontendCode is an object with multiple files, combine them
        mvpData = {
          frontendCode: Object.values(parsedResponse.frontendCode).join('\n\n'),
          backendCode: typeof parsedResponse.backendCode === 'object' 
            ? Object.values(parsedResponse.backendCode).join('\n\n')
            : parsedResponse.backendCode || '',
          databaseSchema: typeof parsedResponse.databaseSchema === 'object'
            ? JSON.stringify(parsedResponse.databaseSchema, null, 2)
            : parsedResponse.databaseSchema || '',
          folderStructure: typeof parsedResponse.folderStructure === 'object'
            ? JSON.stringify(parsedResponse.folderStructure, null, 2)
            : parsedResponse.folderStructure || ''
        };
      } else {
        // If it's already in the expected format
        mvpData = parsedResponse;
      }
    } catch (e) {
      console.log('Failed to parse as JSON, creating structured response');
      // If parsing fails, create a structured response
      mvpData = {
        frontendCode: generatedText.split('## Landing Page')[1]?.split('## Auth System')[0]?.trim() || 'Error generating frontend code',
        backendCode: generatedText.split('## Auth System')[1]?.split('## Database')[0]?.trim() || 'Error generating backend code',
        databaseSchema: generatedText.split('## Database')[1]?.split('## Folder Structure')[0]?.trim() || 'Error generating database schema',
        folderStructure: generatedText.split('## Folder Structure')[1]?.trim() || 'Error generating folder structure'
      };
    }

    console.log('Final MVP data:', mvpData);

    return new Response(JSON.stringify(mvpData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-mvp function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
