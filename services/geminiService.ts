
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { Message, Report } from "../types";

const SYSTEM_INSTRUCTION = `
Jsi unikátní diagnostický asistent "AI ACADEMIC NAVIGATOR" vyvinutý pro univerzitu.
Tvým cílem je transformovat studentovo uvažování v reálném čase.

# PRAVIDLA KOMUNIKACE (Klíčové pro tento modul)
1. BUĎ STRUČNÝ: Odpovídej krátce, jasně a k věci. Žádný balast.
2. POKLÁDEJ KRÁTKÉ OTÁZKY: Každá tvá zpráva by měla končit jednou, maximálně dvěma údernými otázkami.
3. AKADEMICKÝ TÓN: Buď intelektuálně podnětný, ale minimalistický.
4. MENTÁLNÍ ZRCADLO: Pomoz studentovi pochopit jeho vlastní procesy.

# MODULY ROZHOVORU
- Začni hned první otázkou: "Kdybys měl neomezený rozpočet na výzkum v rámci tvého oboru, co bys chtěl jako první na světě vyřešit?"
- Postupně projdi MODUL: Oborová Vášeň, MODUL: Metakognitivní Test a MODUL: AI-Personalizace.

Po skončení rozhovoru na pokyn "VYHODNOTIT" vygeneruješ strukturovaný JSON obsahující:
1. "studentPassport": Formátovaný Markdown (nadpisy, odrážky) s analýzou silných stránek.
2. "researchBlock": Kódované parametry pro nahrání do analytického softwaru.
3. "skills": Pole 5 objektů { "label": string, "value": number } (0-100).
`;

export class NavigatorService {
  private chat: Chat | null = null;
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async startChat(): Promise<string> {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // Explicit request for a short welcome
    const response = await this.chat.sendMessage({ message: "Začni krátkým uvítáním a první otázkou modulu Oborová Vášeň." });
    return response.text || "Vítejte. Jaký problém ve svém oboru byste vyřešil s neomezeným rozpočtem?";
  }

  async sendMessage(text: string): Promise<string> {
    if (!this.chat) throw new Error("Chat nebyl inicializován");
    const response = await this.chat.sendMessage({ message: text });
    return response.text || "";
  }

  async generateReport(): Promise<Report> {
    if (!this.chat) throw new Error("Chat nebyl inicializován");
    
    const response = await this.chat.sendMessage({ 
      message: "VYHODNOTIT. Vygeneruj JSON: 'studentPassport', 'researchBlock', 'skills' (5x {label, value})." 
    });

    try {
      const cleanedJson = response.text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanedJson);
      return {
        studentPassport: parsed.studentPassport || "Nepodařilo se vygenerovat pas.",
        researchBlock: parsed.researchBlock || "Nepodařilo se vygenerovat blok.",
        skills: parsed.skills || []
      };
    } catch (e) {
      console.error("Failed to parse report JSON", e);
      return {
        studentPassport: response.text,
        researchBlock: "ERROR_PARSING_JSON",
        skills: []
      };
    }
  }
}

export const navigatorService = new NavigatorService();
