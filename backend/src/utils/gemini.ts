import { GoogleGenAI } from "@google/genai";

let _ai: GoogleGenAI | null = null;

export function getAI() {
  if (_ai) return _ai;
  const apikey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apikey) {
    throw new Error("GEMINI_API_KEY or GOOGLE_GENAI_API_KEY is missing in env.");
  }
  _ai = new GoogleGenAI({ apiKey: apikey });
  return _ai;
}

/** @deprecated use getAI() */
export const ai = {
  get models() {
    return getAI().models;
  },
};
