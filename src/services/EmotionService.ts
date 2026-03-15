// Emotion Service - face-api.js wrapper for Emotion Recognition module
import * as faceapi from 'face-api.js';

export interface EmotionData {
  timestamp: number;
  emotions: {
    happy: number;
    sad: number;
    angry: number;
    surprised: number;
    neutral: number;
    fearful: number;
    disgusted: number;
  };
  dominantEmotion: string;
}

export interface EmotionSummary {
  totalReadings: number;
  durationMs: number;
  averageEmotions: {
    happy: number;
    sad: number;
    angry: number;
    surprised: number;
    neutral: number;
    fearful: number;
  };
  dominantEmotion: string;
  emotionalStability: number; // 0-100, higher = more stable
  emotionVariance: number;
  peakEmotions: {
    emotion: string;
    value: number;
    timestamp: number;
  }[];
  emotionalJourney: string; // Description of emotional changes
}

export interface EmotionResult {
  sessionId: string;
  startedAt: number;
  completedAt: number;
  timeline: EmotionData[];
  summary: EmotionSummary;
}

export class EmotionService {
  private isInitialized = false;
  private isDetecting = false;
  private timeline: EmotionData[] = [];
  private detectionInterval: number | null = null;
  private startTime: number = 0;

  // Model URLs - face-api.js models from jsdelivr CDN
  private readonly MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model';

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load the required models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(this.MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(this.MODEL_URL)
      ]);
      this.isInitialized = true;
      console.log('Face-api.js models loaded successfully');
    } catch (error) {
      console.error('Error loading face-api.js models:', error);
      throw new Error('Failed to load emotion recognition models');
    }
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  async detectEmotions(video: HTMLVideoElement): Promise<EmotionData | null> {
    if (!this.isInitialized) {
      console.warn('EmotionService not initialized');
      return null;
    }

    try {
      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detections) {
        return null;
      }

      const expressions = detections.expressions;
      const emotions = {
        happy: Math.round(expressions.happy * 100),
        sad: Math.round(expressions.sad * 100),
        angry: Math.round(expressions.angry * 100),
        surprised: Math.round(expressions.surprised * 100),
        neutral: Math.round(expressions.neutral * 100),
        fearful: Math.round(expressions.fearful * 100),
        disgusted: Math.round(expressions.disgusted * 100)
      };

      // Find dominant emotion
      const emotionEntries = Object.entries(emotions);
      const dominant = emotionEntries.reduce((max, curr) =>
        curr[1] > max[1] ? curr : max
      , emotionEntries[0]);

      return {
        timestamp: Date.now(),
        emotions,
        dominantEmotion: dominant[0]
      };
    } catch (error) {
      console.error('Error detecting emotions:', error);
      return null;
    }
  }

  startContinuousDetection(
    video: HTMLVideoElement,
    onDetection: (data: EmotionData | null) => void,
    intervalMs: number = 500
  ): void {
    if (this.isDetecting) {
      this.stopContinuousDetection();
    }

    this.isDetecting = true;
    this.timeline = [];
    this.startTime = Date.now();

    const detect = async () => {
      if (!this.isDetecting) return;

      const emotionData = await this.detectEmotions(video);
      if (emotionData) {
        this.timeline.push(emotionData);
      }
      onDetection(emotionData);
    };

    // Initial detection
    detect();

    // Set up interval for continuous detection
    this.detectionInterval = window.setInterval(detect, intervalMs);
  }

  stopContinuousDetection(): EmotionData[] {
    this.isDetecting = false;
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = null;
    }
    return [...this.timeline];
  }

  getTimeline(): EmotionData[] {
    return [...this.timeline];
  }

  calculateSummary(timeline?: EmotionData[]): EmotionSummary {
    const data = timeline || this.timeline;

    if (data.length === 0) {
      return {
        totalReadings: 0,
        durationMs: 0,
        averageEmotions: { happy: 0, sad: 0, angry: 0, surprised: 0, neutral: 0, fearful: 0 },
        dominantEmotion: 'neutral',
        emotionalStability: 100,
        emotionVariance: 0,
        peakEmotions: [],
        emotionalJourney: 'No data collected'
      };
    }

    const durationMs = data.length > 1
      ? data[data.length - 1].timestamp - data[0].timestamp
      : 0;

    // Calculate averages
    const sums = { happy: 0, sad: 0, angry: 0, surprised: 0, neutral: 0, fearful: 0 };
    const emotions: (keyof typeof sums)[] = ['happy', 'sad', 'angry', 'surprised', 'neutral', 'fearful'];

    data.forEach(d => {
      emotions.forEach(emotion => {
        sums[emotion] += d.emotions[emotion];
      });
    });

    const averageEmotions = {
      happy: Math.round(sums.happy / data.length),
      sad: Math.round(sums.sad / data.length),
      angry: Math.round(sums.angry / data.length),
      surprised: Math.round(sums.surprised / data.length),
      neutral: Math.round(sums.neutral / data.length),
      fearful: Math.round(sums.fearful / data.length)
    };

    // Find dominant emotion (highest average)
    const dominantEmotion = Object.entries(averageEmotions).reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    , ['neutral', 0])[0];

    // Calculate emotional stability (inverse of variance in dominant emotion changes)
    const dominantValues = data.map(d => d.emotions[dominantEmotion as keyof typeof d.emotions] || d.emotions.neutral);
    const variance = this.calculateVariance(dominantValues);
    const emotionalStability = Math.max(0, Math.min(100, Math.round(100 - variance)));

    // Calculate overall emotion variance
    const allEmotionChanges: number[] = [];
    for (let i = 1; i < data.length; i++) {
      emotions.forEach(emotion => {
        const change = Math.abs(data[i].emotions[emotion] - data[i - 1].emotions[emotion]);
        allEmotionChanges.push(change);
      });
    }
    const emotionVariance = allEmotionChanges.length > 0
      ? Math.round(allEmotionChanges.reduce((a, b) => a + b, 0) / allEmotionChanges.length)
      : 0;

    // Find peak emotions
    const peakEmotions: EmotionSummary['peakEmotions'] = [];
    emotions.forEach(emotion => {
      let maxValue = 0;
      let maxTimestamp = 0;
      data.forEach(d => {
        if (d.emotions[emotion] > maxValue) {
          maxValue = d.emotions[emotion];
          maxTimestamp = d.timestamp;
        }
      });
      if (maxValue > 50) {
        peakEmotions.push({ emotion, value: maxValue, timestamp: maxTimestamp });
      }
    });
    peakEmotions.sort((a, b) => b.value - a.value);

    // Generate emotional journey description
    const emotionalJourney = this.generateJourneyDescription(data, averageEmotions, emotionalStability);

    return {
      totalReadings: data.length,
      durationMs,
      averageEmotions,
      dominantEmotion,
      emotionalStability,
      emotionVariance,
      peakEmotions: peakEmotions.slice(0, 3),
      emotionalJourney
    };
  }

  private calculateVariance(values: number[]): number {
    if (values.length < 2) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squareDiffs = values.map(v => Math.pow(v - mean, 2));
    return Math.sqrt(squareDiffs.reduce((a, b) => a + b, 0) / values.length);
  }

  private generateJourneyDescription(
    data: EmotionData[],
    averages: EmotionSummary['averageEmotions'],
    stability: number
  ): string {
    const parts: string[] = [];

    // Overall state
    if (averages.neutral > 50) {
      parts.push('remained mostly calm');
    } else if (averages.happy > 30) {
      parts.push('showed positive engagement');
    } else if (averages.surprised > 20) {
      parts.push('showed curiosity and surprise');
    } else if (averages.fearful > 20 || averages.sad > 20) {
      parts.push('showed signs of stress');
    }

    // Stability
    if (stability > 80) {
      parts.push('with stable emotional state');
    } else if (stability > 50) {
      parts.push('with moderate emotional fluctuations');
    } else {
      parts.push('with significant emotional changes');
    }

    // Trends
    if (data.length >= 4) {
      const firstQuarter = data.slice(0, Math.floor(data.length / 4));
      const lastQuarter = data.slice(-Math.floor(data.length / 4));

      const firstNeutral = firstQuarter.reduce((sum, d) => sum + d.emotions.neutral, 0) / firstQuarter.length;
      const lastNeutral = lastQuarter.reduce((sum, d) => sum + d.emotions.neutral, 0) / lastQuarter.length;

      if (lastNeutral > firstNeutral + 10) {
        parts.push('becoming more relaxed over time');
      } else if (lastNeutral < firstNeutral - 10) {
        parts.push('showing increased engagement over time');
      }
    }

    return parts.join(', ') || 'Session completed';
  }

  generateResult(): EmotionResult {
    const summary = this.calculateSummary();
    return {
      sessionId: `emotion-${Date.now()}`,
      startedAt: this.startTime,
      completedAt: Date.now(),
      timeline: [...this.timeline],
      summary
    };
  }

  reset(): void {
    this.stopContinuousDetection();
    this.timeline = [];
    this.startTime = 0;
  }
}

export const emotionService = new EmotionService();
