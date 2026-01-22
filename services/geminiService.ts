
import { GoogleGenAI, Type } from "@google/genai";
import { AFRO_ISO3_LIST, AFRO_DISEASES, DISEASE_KEYWORDS } from "../constants";
import { AfroAlert, AlertLevel, SeverityLevel, WorkflowStatus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const fetchDiseaseAlerts = async (selectedDisease?: string, countryFilter?: string): Promise<AfroAlert[]> => {
  const model = "gemini-3-flash-preview";
  
  const diseaseContext = selectedDisease 
    ? AFRO_DISEASES.find(d => d.code === selectedDisease) 
    : { name: "multiple core epidemic diseases", code: "mixed" };

  const prompt = `
    Search for and analyze current disease signals in the WHO AFRO region.
    Focus on: ${diseaseContext?.name} (${diseaseContext?.code}).
    Target Countries: ${countryFilter || AFRO_ISO3_LIST.join(", ")}.
    
    Keywords to use for verification: ${Object.values(DISEASE_KEYWORDS).flat().join(", ")}.
    
    Return a list of 5-8 structured disease alerts matching the following constraints:
    1. Only include countries from the AFRO list provided.
    2. Map them to ICD-10 codes and syndromes from the WHO taxonomy.
    3. Categorize alert levels (WATCH, WARNING, HIGH) and severity (LOW, MODERATE, HIGH, CRITICAL).
    4. Provide evidence details including signal count and unique sources (e.g., GDELT, ProMED, WHO, Local Media).
    5. Include recommended AFRO preparedness actions.
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
              alert_id: { type: Type.STRING },
              alert_type: { type: Type.STRING },
              country_iso3: { type: Type.STRING },
              admin1: { type: Type.STRING },
              disease: {
                type: Type.OBJECT,
                properties: {
                  code: { type: Type.STRING },
                  name: { type: Type.STRING },
                  syndrome: { type: Type.STRING }
                },
                required: ["code", "name", "syndrome"]
              },
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              alert_level: { type: Type.STRING },
              severity: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              priority: { type: Type.NUMBER },
              status: { type: Type.STRING },
              evidence: {
                type: Type.OBJECT,
                properties: {
                  signal_count: { type: Type.NUMBER },
                  unique_sources: { type: Type.NUMBER },
                  source_ids: { type: Type.ARRAY, items: { type: Type.STRING } },
                  top_urls: { type: Type.ARRAY, items: { type: Type.STRING } }
                }
              },
              recommended_afro_actions: { type: Type.ARRAY, items: { type: Type.STRING } },
              created_at: { type: Type.STRING }
            },
            required: ["alert_id", "country_iso3", "title", "alert_level", "severity", "disease"]
          }
        }
      }
    });

    const text = response.text || "[]";
    const data = JSON.parse(text);
    
    // List grounding sources if available
    const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    console.log("Grounding Sources:", grounding);

    return data;
  } catch (error) {
    console.error("Error fetching disease alerts:", error);
    return [];
  }
};
