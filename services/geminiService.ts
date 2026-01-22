
import { GoogleGenAI, Type } from "@google/genai";
import { AFRO_ISO3_LIST, AFRO_DISEASES, DISEASE_KEYWORDS, DATA_SOURCES, LANGUAGES } from "../constants";
import { AfroEvent, AlertLevel, SeverityLevel, WorkflowStatus, GradeLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Executes a function with exponential backoff if a rate limit (429) occurs.
 */
const retryWithBackoff = async <T>(fn: () => Promise<T>, maxRetries = 2, initialDelay = 8000): Promise<T> => {
  let lastError: any;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      const errorMessage = error?.message || "";
      const isRateLimit = 
        errorMessage.includes("429") || 
        error?.status === 429 || 
        errorMessage.includes("RESOURCE_EXHAUSTED") ||
        errorMessage.includes("quota");
      
      if (isRateLimit && i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.warn(`[AFRO Sentinel] Rate limit (429) hit. Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
  throw lastError;
};

export const fetchIntelligence = async (filters: { diseases: string[], countries: string[], grades: string[] }): Promise<{ events: AfroEvent[], error?: string }> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    ROLE: Expert WHO AFRO Surveillance & Digital Signal Intelligence Officer.
    TASK: Scan digital platforms for real-time disease ALERTS and SIGNALS across the African region.
    
    SEARCH FOCUS:
    - Target Countries: ${filters.countries.length > 0 ? filters.countries.join(", ") : "All 47 AFRO Member States"}.
    - Pathogens: ${filters.diseases.length > 0 ? filters.diseases.join(", ") : "All priority epidemic diseases"}.
    - Data Sources: ${DATA_SOURCES.join(", ")}.
    - Languages: ${LANGUAGES.join(", ")}.
    - Keywords: ${Object.values(DISEASE_KEYWORDS).flat().slice(0, 20).join(", ")}.

    SCHEMA REQUIREMENTS:
    Return an array of 8-10 items. 
    - "type" must be 'ALERT' or 'SIGNAL'.
    - "evidence.source_platform" MUST name the specific source.
    - "grade" MUST be Grade 1, 2, 3 or Ungraded.

    JSON ONLY.
  `;

  try {
    const response = await retryWithBackoff(async () => {
      const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      return await genAI.models.generateContent({
        model,
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['ALERT', 'SIGNAL'] },
                country_iso3: { type: Type.STRING },
                country_name: { type: Type.STRING },
                admin1: { type: Type.STRING },
                disease: {
                  type: Type.OBJECT,
                  properties: {
                    code: { type: Type.STRING },
                    name: { type: Type.STRING },
                    syndrome: { type: Type.STRING }
                  }
                },
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                alert_level: { type: Type.STRING, enum: Object.values(AlertLevel) },
                grade: { type: Type.STRING, enum: Object.values(GradeLevel) },
                confidence: { type: Type.NUMBER },
                status: { type: Type.STRING, enum: Object.values(WorkflowStatus) },
                epidemiology: {
                  type: Type.OBJECT,
                  properties: {
                    confirmed_cases: { type: Type.NUMBER },
                    deaths: { type: Type.NUMBER },
                    cfr: { type: Type.STRING },
                    severity: { type: Type.STRING, enum: Object.values(SeverityLevel) }
                  }
                },
                community_pulse: {
                  type: Type.OBJECT,
                  properties: {
                    informal_signal_volume: { type: Type.STRING, enum: ['low', 'moderate', 'high'] },
                    vernacular_terms: { type: Type.ARRAY, items: { type: Type.STRING } },
                    sentiment: { type: Type.STRING },
                    anecdote_snippet: { type: Type.STRING }
                  }
                },
                evidence: {
                  type: Type.OBJECT,
                  properties: {
                    signal_count: { type: Type.NUMBER },
                    source_platform: { type: Type.STRING },
                    top_urls: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                },
                field_readiness: { type: Type.ARRAY, items: { type: Type.STRING } },
                created_at: { type: Type.STRING }
              }
            }
          }
        }
      });
    });

    const data = JSON.parse(response.text || "[]");
    return { events: data };
  } catch (error: any) {
    const isQuota = error?.message?.includes("429") || error?.message?.includes("quota") || error?.message?.includes("RESOURCE_EXHAUSTED");
    return { events: [], error: isQuota ? "QUOTA_EXHAUSTED" : error.message };
  }
};
