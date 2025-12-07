import { GoogleGenAI } from "@google/genai";
import { Lap, AnalysisResult } from '../types';
import { formatTimeForAI } from '../utils/timeUtils';

// Initialize Gemini Client
// IMPORTANT: process.env.API_KEY is automatically injected.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePerformance = async (laps: Lap[]): Promise<AnalysisResult> => {
  if (laps.length === 0) {
    return {
      summary: "No laps recorded yet.",
      insights: ["Start the timer and record some laps to get insights."]
    };
  }

  const lapData = laps.map((l, index) => 
    `Lap ${index + 1}: Split Time: ${formatTimeForAI(l.split)}, Total Time: ${formatTimeForAI(l.time)}`
  ).join('\n');

  const prompt = `
    You are a professional athletic performance coach. Analyze the following stopwatch lap data.
    
    Data:
    ${lapData}
    
    Please provide:
    1. A brief 1-sentence summary of the performance trend (e.g., "consistent pacing", "slowing down", "strong finish").
    2. A list of 3 specific, bullet-point insights or observations (e.g., fastest lap, average deviation, fatigue signs).
    
    Format the output as valid JSON with keys: "summary" (string) and "insights" (array of strings). Do not use Markdown code blocks. Just the JSON string.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      summary: "Unable to analyze performance at this time.",
      insights: ["Please check your connection or try again later."]
    };
  }
};
