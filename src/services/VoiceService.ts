// Voice Service - Web Speech API wrapper for Voice Interview module

export interface InterviewExchange {
  questionId: string;
  question: string;
  transcript: string;
  timestamp: number;
}

export interface VoiceInterviewResult {
  sessionId: string;
  startedAt: number;
  completedAt: number;
  exchanges: InterviewExchange[];
  studentPassport: {
    summary: string;
    studyHabits: string;
    goals: string;
    learningStyle: string;
    challenges: string;
    strengths: string[];
    areasForImprovement: string[];
    recommendations: string[];
  };
  rawTranscript: string;
}

// Extend Window interface for webkit prefix
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export class VoiceService {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis;
  private isListening = false;
  private transcript = '';
  private language: 'cs-CZ' | 'en-US' = 'en-US';

  constructor() {
    this.synthesis = window.speechSynthesis;

    // Initialize Speech Recognition
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      this.recognition = new SpeechRecognitionAPI();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.language;
    }
  }

  setLanguage(lang: 'cs' | 'en'): void {
    this.language = lang === 'cs' ? 'cs-CZ' : 'en-US';
    if (this.recognition) {
      this.recognition.lang = this.language;
    }
  }

  isSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  async speak(text: string, lang: 'cs' | 'en' = 'en'): Promise<void> {
    return new Promise((resolve, reject) => {
      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'cs' ? 'cs-CZ' : 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onend = () => resolve();
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        resolve(); // Don't reject, just continue
      };

      this.synthesis.speak(utterance);
    });
  }

  stopSpeaking(): void {
    this.synthesis.cancel();
  }

  startListening(onInterimResult?: (text: string) => void): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported in this browser'));
        return;
      }

      if (this.isListening) {
        this.stopListening();
      }

      this.transcript = '';
      this.isListening = true;

      this.recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        this.transcript += final;
        if (onInterimResult) {
          onInterimResult(this.transcript + interim);
        }
      };

      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        // Don't reject on 'no-speech' or 'aborted' errors
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
          reject(new Error(event.error));
        }
      };

      this.recognition.onend = () => {
        // If still supposed to be listening, restart
        if (this.isListening) {
          try {
            this.recognition?.start();
          } catch (e) {
            // Already started, ignore
          }
        }
      };

      try {
        this.recognition.start();
      } catch (e) {
        reject(e);
      }
    });
  }

  stopListening(): string {
    if (this.recognition && this.isListening) {
      this.isListening = false;
      this.recognition.stop();
    }
    return this.transcript;
  }

  getTranscript(): string {
    return this.transcript;
  }

  clearTranscript(): void {
    this.transcript = '';
  }
}

export const voiceService = new VoiceService();
