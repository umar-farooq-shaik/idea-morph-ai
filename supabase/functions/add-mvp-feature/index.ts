
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
    const { originalMVP, newFeature, idea } = await req.json();

    if (!originalMVP || !newFeature) {
      throw new Error('Original MVP and new feature are required');
    }

    const prompt = `Add the following feature to the previously generated MVP:

"${newFeature}"

Original MVP for idea: "${idea}"

Current MVP Code:
Frontend: ${originalMVP.frontendCode}
Backend: ${originalMVP.backendCode}
Database: ${originalMVP.databaseSchema}
Folder Structure: ${originalMVP.folderStructure}

Update:
- Frontend (React) - add or modify components as needed
- Backend (routes or functions) - add new endpoints/functions
- Database schema if needed - add new collections/fields
- Folder structure if new files are needed

Return updated code as JSON with keys: frontendCode, backendCode, databaseSchema, folderStructure

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

    // Try to parse the response as JSON
    let updatedMVP;
    try {
      // Remove any markdown code blocks if present
      const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
      updatedMVP = JSON.parse(cleanedText);
    } catch (e) {
      // If parsing fails, return the original MVP with a note
      updatedMVP = {
        ...originalMVP,
        frontendCode: originalMVP.frontendCode + '\n\n// Feature addition failed - please try again',
        backendCode: originalMVP.backendCode + '\n\n// Feature addition failed - please try again'
      };
    }

    return new Response(JSON.stringify(updatedMVP), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in add-mvp-feature function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
