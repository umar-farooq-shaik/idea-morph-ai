
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getPrompt = (idea: string) => `
You are Cofounder AI — an expert AI startup assistant.

The user has submitted this startup idea:
---
"${idea}"
---

Generate a personalized 12-part business plan tailored specifically to this idea. Do NOT give generic text — every section should match the domain, product type, audience, and business model of the idea.

Your response MUST be a single, valid JSON object, and nothing else. Do not wrap it in markdown backticks or any other text.

The JSON object must have the following structure and keys. Fill in the values based on the user's idea:
{
  "ideaValidation": { "title": "Idea Validation", "summary": "Initial validation of your startup concept.", "cta": "Next, talk to 10 potential customers about this.", "content": "A detailed analysis of the idea's potential and viability.", "questions": [ { "question": "What problem are you solving?", "answer": "..." }, { "question": "Is the market big enough?", "answer": "..." }, { "question": "What is your unique angle?", "answer": "..." } ] },
  "founderFit": { "title": "Founder-Idea Fit", "summary": "Assessing your alignment with the startup idea.", "cta": "Next, identify gaps in your skillset and find a co-founder if needed.", "content": "Analysis of why you are the right person/team to build this.", "scores": [ { "area": "Passion", "score": 8, "reasoning": "..." }, { "area": "Expertise", "score": 6, "reasoning": "..." }, { "area": "Network", "score": 7, "reasoning": "..." } ] },
  "competitorScan": { "title": "Competitor Scan", "summary": "An overview of the competitive landscape.", "cta": "Next, create a detailed feature comparison matrix.", "content": "A look at the top 3 competitors and where the opportunity lies.", "competitors": [ { "name": "Competitor 1", "strength": "...", "gap": "..." }, { "name": "Competitor 2", "strength": "...", "gap": "..." }, { "name": "Competitor 3", "strength": "...", "gap": "..." } ] },
  "targetAudience": { "title": "Target Audience", "summary": "Defining your ideal customer profile.", "cta": "Next, create a detailed user persona for your ideal customer.", "content": "Description of the primary and secondary target audiences.", "personas": [ { "name": "Persona 1 Name", "description": "...", "needs": ["..."] }, { "name": "Persona 2 Name", "description": "...", "needs": ["..."] } ] },
  "problemSolution": { "title": "Problem-Solution Fit", "summary": "Clarifying the core problem and your unique solution.", "cta": "Next, build a landing page to test this value proposition.", "problem": "A clear statement of the customer's problem.", "solution": "How your product/service solves that problem effectively." },
  "roadmap": { "title": "Roadmap & Timeline", "summary": "A high-level plan from MVP to future growth.", "cta": "Next, break down the MVP phase into specific tasks and sprints.", "content": "Key milestones for the next 12 months.", "stages": [ { "name": "Phase 1: MVP (0-3 Months)", "description": "Core features to launch with.", "tasks": ["Task 1", "Task 2"] }, { "name": "Phase 2: Growth (4-8 Months)", "description": "Features to drive user acquisition.", "tasks": ["Task 1", "Task 2"] }, { "name": "Phase 3: Scale (9-12+ Months)", "description": "Features for scaling and monetization.", "tasks": ["Task 1", "Task 2"] } ] },
  "documentsNeeded": { "title": "Documents Needed", "summary": "Essential legal and business documents to prepare.", "cta": "Next, consult with a lawyer to draft these documents.", "content": "A checklist of documents to get your business started.", "documents": [ { "name": "Pitch Deck", "description": "For investors and partners." }, { "name": "Business Plan", "description": "A detailed operational plan." }, { "name": "Founder's Agreement", "description": "Defines roles and equity." } ] },
  "fundingStrategy": { "title": "Funding Strategy", "summary": "How to finance your startup's growth.", "cta": "Next, build a financial model to project your revenue and expenses.", "content": "Recommended funding stages and sources.", "strategies": [ { "name": "Bootstrapping", "description": "Self-funding through revenue." }, { "name": "Angel Investment", "description": "For early-stage seed capital." }, { "name": "Venture Capital", "description": "For scaling and rapid growth." } ] },
  "nameAndDomains": { "title": "Name & Domain Ideas", "summary": "Suggestions for your brand identity.", "cta": "Next, check for domain and social media handle availability.", "content": "Creative and relevant name ideas based on your concept.", "names": [ { "name": "Name 1", "reasoning": "...", "available": true }, { "name": "Name 2", "reasoning": "...", "available": false }, { "name": "Name 3", "reasoning": "...", "available": true } ] },
  "businessModel": { "title": "Business Model", "summary": "How your startup will generate revenue.", "cta": "Next, validate your pricing strategy with potential customers.", "content": "Analysis of potential revenue streams.", "colors": { "freemium": "#4CAF50", "saas": "#2196F3", "b2b": "#FF9800" }, "models": [ { "name": "Freemium SaaS", "description": "...", "recommended": false }, { "name": "Pure Subscription", "description": "...", "recommended": true }, { "name": "Marketplace", "description": "...", "recommended": false } ] },
  "chatbotSetup": { "title": "AI Chatbot Setup", "summary": "Simulating a customer interaction chatbot.", "cta": "Next, implement a simple chatbot on your landing page.", "content": "Example FAQs your AI chatbot could answer.", "faqs": [ { "user": "What does your product do?", "bot": "..." }, { "user": "What is the pricing?", "bot": "..." } ] },
  "executionScore": { "title": "Execution Score", "summary": "An estimated score for your idea's execution potential.", "cta": "Focus on the lowest-scoring areas to improve your chances of success.", "score": 75, "breakdown": [ { "name": "Market Need", "value": 80 }, { "name": "Solution Viability", "value": 70 }, { "name": "Team Strength", "value": 60 }, { "name": "Monetization", "value": 85 } ] }
}

Make sure the output is 100% relevant to: "${idea}"
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY is not set in Supabase secrets.");
    }

    const { idea } = await req.json();
    if (!idea) {
      throw new Error("No idea provided in the request body.");
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: getPrompt(idea) }] }],
        generationConfig: {
          responseMimeType: "application/json",
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ],
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Gemini API request failed: ${errorBody}`);
    }

    const data = await res.json();
    const responseJson = data.candidates[0].content.parts[0].text;
    
    return new Response(responseJson, {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
