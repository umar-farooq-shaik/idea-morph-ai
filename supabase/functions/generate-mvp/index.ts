
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

    const prompt = `You are an AI software engineer.

Please generate a full MVP from the startup idea below.

---

💡 Startup Idea: "${idea}"

🎯 Generate:

1. **Landing Page UI**
   - Hero section with tagline
   - About section, Features, CTA button
   - Use React/JSX

2. **Authentication System**
   - Signup/Login with email & password
   - Use Firebase Auth or Node.js with JWT

3. **Database Schema**
   - 3+ collections with relevant fields
   - Format for MongoDB Mongoose

4. **Folder Structure**
   - Provide file tree
   - Separate: /frontend, /backend, /database

📦 Final Output:
- Return as JSON with these exact keys: frontendCode, backendCode, databaseSchema, folderStructure
- Each value should be a string containing the relevant code
- Make sure code is clean and can be exported as a deployable MVP

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
    let mvpData;
    try {
      // Remove any markdown code blocks if present
      const cleanedText = generatedText.replace(/```json\n?|\n?```/g, '').trim();
      mvpData = JSON.parse(cleanedText);
    } catch (e) {
      // If parsing fails, create a structured response
      mvpData = {
        frontendCode: generatedText.split('Frontend Code:')[1]?.split('Backend Code:')[0]?.trim() || 'Error generating frontend code',
        backendCode: generatedText.split('Backend Code:')[1]?.split('Database Schema:')[0]?.trim() || 'Error generating backend code',
        databaseSchema: generatedText.split('Database Schema:')[1]?.split('Folder Structure:')[0]?.trim() || 'Error generating database schema',
        folderStructure: generatedText.split('Folder Structure:')[1]?.trim() || 'Error generating folder structure'
      };
    }

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
