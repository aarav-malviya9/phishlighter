import { SYSTEM_PROMPT } from './prompts';
import { mockAnalyses, generateFallbackAnalysis } from './mockData';

/**
 * Analyze an email for social engineering tactics using either:
 * 1. Groq API (free tier, fast inference with Llama models)
 * 2. Ollama (local model)
 * 3. Mock/fallback data (when no API is available)
 */
export async function analyzeEmail(emailText, options = {}) {
  const { sampleId, forceDemo } = options;

  // If this is a known sample email and demo mode is on, use pre-computed results
  if (sampleId && (forceDemo || !process.env.GROQ_API_KEY)) {
    if (mockAnalyses[sampleId]) {
      // Simulate a brief delay for realism
      await new Promise((r) => setTimeout(r, 800));
      return { ...mockAnalyses[sampleId], source: 'demo' };
    }
  }

  // Try Groq API first
  if (process.env.GROQ_API_KEY) {
    try {
      return await analyzeWithGroq(emailText);
    } catch (err) {
      console.error('Groq API failed, falling back:', err.message);
    }
  }

  // Try Ollama if configured
  const ollamaUrl = process.env.OLLAMA_BASE_URL;
  if (ollamaUrl) {
    try {
      return await analyzeWithOllama(emailText, ollamaUrl);
    } catch (err) {
      console.error('Ollama failed, falling back:', err.message);
    }
  }

  // Final fallback: mock/heuristic analysis
  if (sampleId && mockAnalyses[sampleId]) {
    return { ...mockAnalyses[sampleId], source: 'demo' };
  }

  return { ...generateFallbackAnalysis(emailText), source: 'fallback' };
}

async function analyzeWithGroq(emailText) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Analyze this email/message for social engineering tactics:\n\n${emailText}`,
        },
      ],
      temperature: 0.1,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response from Groq API');
  }

  const parsed = JSON.parse(content);
  return { ...parsed, source: 'groq' };
}

async function analyzeWithOllama(emailText, baseUrl) {
  const response = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3.1',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Analyze this email/message for social engineering tactics:\n\n${emailText}`,
        },
      ],
      format: 'json',
      stream: false,
      options: { temperature: 0.1 },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama error ${response.status}`);
  }

  const data = await response.json();
  const content = data.message?.content;

  if (!content) {
    throw new Error('Empty response from Ollama');
  }

  const parsed = JSON.parse(content);
  return { ...parsed, source: 'ollama' };
}
