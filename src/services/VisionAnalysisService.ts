// Vision Analysis Service - GPT-4 Vision for Math Reasoning Analysis
import OpenAI from 'openai';

export interface MathReasoningStep {
  stepNumber: number;
  description: string;
  isCorrect: boolean;
  conceptUsed: string;
}

export interface MathReasoningResult {
  problemDescription: string;
  stepsIdentified: MathReasoningStep[];
  missingSteps: string[];
  conceptualGaps: {
    concept: string;
    explanation: string;
    remediation: string;
  }[];
  overallScore: number;
  feedback: string;
  recommendations: string[];
}

export class VisionAnalysisService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  async extractFramesFromVideo(video: File, maxFrames: number = 8): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const videoEl = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const frames: string[] = [];

      videoEl.src = URL.createObjectURL(video);
      videoEl.muted = true;

      videoEl.onloadedmetadata = () => {
        canvas.width = Math.min(videoEl.videoWidth, 1024);
        canvas.height = Math.min(videoEl.videoHeight, 768);

        const duration = videoEl.duration;
        const interval = duration / maxFrames;
        let currentTime = 0;

        const captureFrame = () => {
          if (currentTime >= duration || frames.length >= maxFrames) {
            URL.revokeObjectURL(videoEl.src);
            resolve(frames);
            return;
          }

          videoEl.currentTime = currentTime;
        };

        videoEl.onseeked = () => {
          ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          frames.push(dataUrl);
          currentTime += interval;
          captureFrame();
        };

        captureFrame();
      };

      videoEl.onerror = () => {
        URL.revokeObjectURL(videoEl.src);
        reject(new Error('Failed to load video'));
      };
    });
  }

  async analyzeMathReasoning(frames: string[], lang: 'cs' | 'en'): Promise<MathReasoningResult> {
    const systemPrompt = lang === 'cs'
      ? `Jsi expert na matematiku, který analyzuje postup řešení studenta z obrázků.
Analyzuj sekvenci obrázků ukazujících studenta, jak řeší matematický příklad na papíře.

Identifikuj:
1. Jaký příklad student řeší
2. Jednotlivé kroky, které udělal
3. Chybějící kroky
4. Konceptuální mezery v porozumění
5. Celkové hodnocení (0-100)

Odpověz POUZE validním JSON:
{
  "problemDescription": "popis příkladu",
  "stepsIdentified": [{"stepNumber": 1, "description": "...", "isCorrect": true, "conceptUsed": "..."}],
  "missingSteps": ["krok, který měl být zahrnut"],
  "conceptualGaps": [{"concept": "...", "explanation": "...", "remediation": "..."}],
  "overallScore": 75,
  "feedback": "detailní zpětná vazba",
  "recommendations": ["doporučení 1", "doporučení 2"]
}`
      : `You are a math expert analyzing a student's problem-solving process from images.
Analyze the sequence of images showing a student solving a math problem on paper.

Identify:
1. What problem the student is solving
2. The individual steps they took
3. Missing steps
4. Conceptual gaps in understanding
5. Overall assessment (0-100)

Respond ONLY with valid JSON:
{
  "problemDescription": "description of the problem",
  "stepsIdentified": [{"stepNumber": 1, "description": "...", "isCorrect": true, "conceptUsed": "..."}],
  "missingSteps": ["step that should have been included"],
  "conceptualGaps": [{"concept": "...", "explanation": "...", "remediation": "..."}],
  "overallScore": 75,
  "feedback": "detailed feedback",
  "recommendations": ["recommendation 1", "recommendation 2"]
}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: lang === 'cs'
                  ? 'Analyzuj tyto obrázky ukazující postup řešení matematického příkladu:'
                  : 'Analyze these images showing the math problem-solving process:'
              },
              ...frames.map(frame => ({
                type: 'image_url' as const,
                image_url: { url: frame, detail: 'high' as const }
              }))
            ]
          }
        ],
        max_tokens: 2000
      });

      const content = response.choices[0]?.message?.content || '';

      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as MathReasoningResult;
      }

      // Fallback if parsing fails
      return {
        problemDescription: lang === 'cs' ? 'Nepodařilo se rozpoznat příklad' : 'Could not recognize the problem',
        stepsIdentified: [],
        missingSteps: [],
        conceptualGaps: [],
        overallScore: 0,
        feedback: content,
        recommendations: []
      };
    } catch (error) {
      console.error('Vision analysis error:', error);
      throw error;
    }
  }
}

export const visionAnalysisService = new VisionAnalysisService();
