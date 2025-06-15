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

Generate a personalized 12-part business plan tailored specifically to this idea. Your analysis must be deep, insightful, and practical. Do NOT give generic text — every section should match the domain, product type, audience, and business model of the idea.

Your response MUST be a single, valid JSON object, and nothing else. Do not wrap it in markdown backticks or any other text.

The JSON object must have the following structure and keys. Fill in the string values with detailed, specific, and actionable content based on the user's idea.

{
  "ideaValidation": {
    "title": "Idea Validation",
    "summary": "Initial validation of your startup concept.",
    "cta": "Next, talk to 10 potential customers about this.",
    "verdict": "A short, conclusive verdict (e.g., 'Promising, with clear market need').",
    "content": "A detailed analysis of the idea's potential and viability, directly addressing the provided startup idea. What makes it strong or weak?",
    "strengths": [
      "A specific strength of the idea.",
      "Another specific strength.",
      "A third specific strength."
    ],
    "risks": [
      "A specific risk or challenge for this idea.",
      "Another specific risk.",
      "A third specific risk."
    ]
  },
  "founderFit": {
    "title": "Founder-Idea Fit",
    "summary": "Assessing your alignment with the startup idea.",
    "cta": "Next, identify gaps in your skillset and find a co-founder if needed.",
    "content": "Analysis of why a founder would be the right person/team to build this. What specific skills, passions, or experiences are crucial for THIS idea?",
    "checklist": [
        "A key trait or skill needed, e.g., 'Deep understanding of the target user's daily workflow'.",
        "Another key trait, e.g., 'Experience with B2B SaaS sales cycles'.",
        "A third required skill, e.g., 'Technical expertise in AI/ML model training'."
    ]
  },
  "competitorScan": {
    "title": "Competitor Scan",
    "summary": "An overview of the competitive landscape.",
    "cta": "Next, create a detailed feature comparison matrix.",
    "content": "A look at the top 3 direct or indirect competitors and where the opportunity lies for this specific idea.",
    "competitors": [
      { "name": "Competitor 1 Name", "strength": "What is their main advantage?", "gap": "What critical weakness or market gap can you exploit?" },
      { "name": "Competitor 2 Name", "strength": "What is their main advantage?", "gap": "What critical weakness or market gap can you exploit?" },
      { "name": "Competitor 3 Name", "strength": "What is their main advantage?", "gap": "What critical weakness or market gap can you exploit?" }
    ]
  },
  "targetAudience": {
    "title": "Target Audience",
    "summary": "Defining your ideal customer profile.",
    "cta": "Next, create a detailed user persona for your ideal customer.",
    "content": "Description of the primary and secondary target audiences. Be specific about demographics, psychographics, and behaviors relevant to the idea.",
    "personas": [
      {
        "name": "Primary Persona Name (e.g., 'Productivity-Focused Project Manager')",
        "pain_points": ["A specific pain point.", "Another specific pain point."],
        "habits": ["A relevant daily habit.", "Another relevant habit."],
        "needs": ["A core need your idea solves.", "Another core need."]
      }
    ]
  },
  "problemSolution": {
    "title": "Problem-Solution Fit",
    "summary": "Clarifying the core problem and your unique solution.",
    "cta": "Next, build a landing page to test this value proposition.",
    "problem": "A clear, concise statement of the customer's primary problem that your idea addresses.",
    "solution": "How your product/service solves that problem in a unique and effective way."
  },
  "roadmap": {
    "title": "Roadmap & Timeline",
    "summary": "A high-level plan from MVP to future growth.",
    "cta": "Next, break down the MVP phase into specific tasks and sprints.",
    "content": "Key milestones for the next 12 months, tailored to building and launching this specific product.",
    "timeline": [
      { "period": "0-3 Months", "title": "MVP Development & Launch", "tasks": ["Task 1 specific to the MVP", "Task 2 specific to the MVP"] },
      { "period": "4-8 Months", "title": "Growth & User Feedback", "tasks": ["Task 1 for growth", "Task 2 for growth"] },
      { "period": "9-12+ Months", "title": "Scale & Monetization", "tasks": ["Task 1 for scaling", "Task 2 for scaling"] }
    ]
  },
  "documentsNeeded": {
    "title": "Documents Needed",
    "summary": "Essential legal and business documents to prepare.",
    "cta": "Next, consult with a lawyer to draft these documents.",
    "content": "A checklist of documents to get your business started, with notes on why each is important for this idea.",
    "documents": [
      { "name": "Pitch Deck", "description": "For investors and partners.", "icon": "file-text" },
      { "name": "One-Pager", "description": "A concise summary for outreach.", "icon": "grid-2x2" },
      { "name": "Founders' Agreement", "description": "Defines roles, equity, and responsibilities.", "icon": "book-open" }
    ]
  },
  "fundingStrategy": {
    "title": "Funding Strategy",
    "summary": "How to finance your startup's growth.",
    "cta": "Next, build a financial model to project your revenue and expenses.",
    "content": "Recommended funding stages and sources, explaining why they are a fit for this type of business.",
    "strategies": [
      { "name": "Bootstrapping", "description": "Self-funding through initial revenue. Is this viable for your idea?" },
      { "name": "Angel Investment", "description": "Seeking seed capital from individuals for early-stage development." },
      { "name": "Venture Capital", "description": "Raising a larger round for rapid scaling and market capture." }
    ]
  },
  "nameAndDomains": {
    "title": "Name & Domain Ideas",
    "summary": "Suggestions for your brand identity.",
    "cta": "Next, check for domain and social media handle availability.",
    "content": "Creative and relevant name ideas based on your concept. Check for .com, .ai, and .xyz availability.",
    "names": [
      { "name": "NameIdeaOne", "com": true, "ai": false, "xyz": true },
      { "name": "AnotherName", "com": false, "ai": true, "xyz": true },
      { "name": "ThirdCreativeName", "com": true, "ai": true, "xyz": true }
    ]
  },
  "businessModel": {
    "title": "Business Model",
    "summary": "How your startup will generate revenue.",
    "cta": "Next, validate your pricing strategy with potential customers.",
    "content": "Analysis of potential revenue streams. One model should be recommended.",
    "colors": { "freemium": "#4CAF50", "saas": "#2196F3", "b2b": "#FF9800" },
    "models": [
      { "name": "Freemium SaaS", "description": "A specific description of how a freemium model would work for this idea.", "recommended": false },
      { "name": "Pure Subscription", "description": "A specific description of how a subscription model would work for this idea.", "recommended": true },
      { "name": "Marketplace", "description": "A specific description of how a marketplace model would work for this idea.", "recommended": false }
    ]
  },
  "chatbotSetup": {
    "title": "AI Chatbot Setup",
    "summary": "Simulating a customer interaction chatbot.",
    "cta": "Next, implement a simple chatbot on your landing page.",
    "content": "Example FAQs your AI chatbot could answer, specific to this business idea.",
    "faqs": [
      { "user": "What does your product do?", "bot": "A helpful, concise answer about the product." },
      { "user": "What is the pricing?", "bot": "An answer about the potential pricing model." }
    ]
  },
  "executionScore": {
    "title": "Execution Score",
    "summary": "An estimated score for your idea's execution potential.",
    "cta": "Focus on the lowest-scoring areas to improve your chances of success.",
    "content": "A brief explanation of the overall score.",
    "score": 75,
    "breakdown": [
      { "metric": "Market Need", "score": 80 },
      { "metric": "Solution Viability", "score": 70 },
      { "metric": "Team Strength (Assumed)", "score": 60 },
      { "metric": "Monetization Potential", "score": 85 }
    ]
  }
}

Make sure the output is 100% relevant to: "${idea}" and adheres strictly to the JSON schema provided.
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
