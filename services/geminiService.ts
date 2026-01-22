
import { GoogleGenAI, Type } from "@google/genai";
import { AFRO_ISO3_LIST, AFRO_DISEASES, DISEASE_KEYWORDS, LANGUAGES } from "../constants";
import { AfroEvent, GradeLevel, WorkflowStatus } from "../types";

// Corrected initialization with named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchIntelligence = async (filters: any): Promise<AfroEvent[]> => {
  // Use gemini-3-pro-preview for complex intelligence reasoning tasks
  const model = "gemini-3-pro-preview";
  
  const prompt = `
    ROLE: WHO AFRO Lead Intelligence Officer.
    TASK: Scan digital airwaves for Public Health SIGNALS and ALERTS across 47 African countries.
    
    DEFINITIONS:
    1. SIGNAL: Raw grassroots chatter, social media hashtags, or local news mentions of "strange deaths", "fever clusters", or vernacular terms like "running stomach".
    2. ALERT: A signal that has been cross-referenced and represents a potential outbreak. Assign WHO GRADE (1, 2, or 3).
    
    NOISE REDUCTION: Ignore promotional health posts, generic news, or routine health campaigns. Focus on EMERGING events.
    
    VULNERABILITY SCAN: ${JSON.stringify(filters)}
    
    KEYWORDS: ${Object.values(DISEASE_KEYWORDS).flat().join(", ")}
    LANGUAGES: ${LANGUAGES.join(", ")}
    
    OUTPUT: A list of 10-12 events. Distinguish between 'SIGNAL' and 'ALERT'.
    Grade 3 = Immediate regional threat.
    Grade 1 = Localized.
    
    JSON ONLY.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING },
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
              alert_level: { type: Type.STRING },
              grade: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              status: { type: Type.STRING },
              community_pulse: {
                type: Type.OBJECT,
                properties: {
                  informal_signal_volume: { type: Type.STRING },
                  vernacular_terms: { type: Type.ARRAY, items: { type: Type.STRING } },
                  sentiment: { type: Type.STRING }
                }
              },
              evidence: {
                type: Type.OBJECT,
                properties: {
                  signal_count: { type: Type.NUMBER },
                  source_types: { type: Type.ARRAY, items: { type: Type.STRING } },
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

    // Extract text and grounding chunks as per guidelines
    const text = response.text || "[]";
    let events: AfroEvent[] = [];
    
    try {
      events = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      return [];
    }

    // Always extract website URLs from groundingChunks and list them
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      const searchUrls = groundingChunks
        .filter(chunk => chunk.web)
        .map(chunk => chunk.web?.uri)
        .filter((uri): uri is string => !!uri);

      if (searchUrls.length > 0) {
        // Distribute search URLs into the events' evidence
        events = events.map((event, idx) => ({
          ...event,
          evidence: {
            ...event.evidence,
            top_urls: [...(event.evidence?.top_urls || []), ...(idx === 0 ? searchUrls : [])].slice(0, 10)
          }
        }));
      }
    }

    return events;
  } catch (error) {
    console.error("Intelligence Pipeline Error:", error);
    return [];
  }
};
