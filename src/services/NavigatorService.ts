import OpenAI from 'openai';
import { Report } from '../../types';
import { SYSTEM_INSTRUCTION } from '../modules/prompts/systemPrompt';
import { START_PROMPT, TURN_REMINDER, EVALUATE_PROMPT } from '../modules/prompts/reminders';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class NavigatorService {
  private messages: ChatMessage[] = [];
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
      dangerouslyAllowBrowser: true
    });
  }

  async startChat(): Promise<string> {
    this.messages = [
      { role: 'system', content: SYSTEM_INSTRUCTION },
      { role: 'user', content: START_PROMPT }
    ];

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: this.messages,
      temperature: 0.6,
      max_tokens: 250
    });

    const assistantMessage =
      response.choices[0]?.message?.content ||
      'Hi! I\'m here to help you better understand how you learn and what you enjoy. What do you do when you have free time and no one is telling you what to do?';

    this.messages.push({ role: 'assistant', content: assistantMessage });
    return assistantMessage;
  }

  async sendMessage(text: string): Promise<string> {
    if (!this.messages.length) {
      throw new Error('Chat was not initialized');
    }

    this.messages.push({ role: 'user', content: text });

    const messagesWithReminder = [
      ...this.messages,
      { role: 'system' as const, content: TURN_REMINDER }
    ];

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messagesWithReminder,
      temperature: 0.6,
      max_tokens: 300
    });

    const assistantMessage = response.choices[0]?.message?.content || '';
    this.messages.push({ role: 'assistant', content: assistantMessage });
    return assistantMessage;
  }

  async generateReport(): Promise<Report> {
    if (!this.messages.length) {
      throw new Error('Chat was not initialized');
    }

    this.messages.push({
      role: 'user',
      content: EVALUATE_PROMPT
    });

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: this.messages,
      temperature: 0.3,
      max_tokens: 2000
    });

    const responseText = response.choices[0]?.message?.content || '';

    try {
      let cleanedJson = responseText
        .replace(/```json\s*/gi, '')
        .replace(/```\s*/g, '')
        .trim();

      const firstBrace = cleanedJson.indexOf('{');
      const lastBrace = cleanedJson.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        cleanedJson = cleanedJson.substring(firstBrace, lastBrace + 1);
      }

      const parsed = JSON.parse(cleanedJson);
      return {
        studentPassport: parsed.studentPassport || 'Failed to generate profile.',
        researchBlock: parsed.researchBlock || 'ERROR_NO_DATA',
        skills: parsed.skills || [
          { label: 'Independence', value: 50 },
          { label: 'Organization', value: 50 },
          { label: 'Creativity', value: 50 },
          { label: 'Perseverance', value: 50 },
          { label: 'Collaboration', value: 50 }
        ]
      };
    } catch (e) {
      console.error('Failed to parse report JSON:', e);
      console.error('Raw response:', responseText);
      return {
        studentPassport: responseText,
        researchBlock: 'ERROR_PARSING_JSON',
        skills: [
          { label: 'Independence', value: 50 },
          { label: 'Organization', value: 50 },
          { label: 'Creativity', value: 50 },
          { label: 'Perseverance', value: 50 },
          { label: 'Collaboration', value: 50 }
        ]
      };
    }
  }

  // Get chat history (for debug or export)
  getHistory(): ChatMessage[] {
    return [...this.messages];
  }

  // Reset chat
  reset(): void {
    this.messages = [];
  }
}

export const navigatorService = new NavigatorService();
