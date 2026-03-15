// Voice Interview Module - AI-powered conversational interview

export interface InterviewQuestion {
  id: string;
  category: 'study_habits' | 'goals' | 'learning_preferences' | 'challenges' | 'motivation';
  question: { cs: string; en: string };
}

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 'V1',
    category: 'study_habits',
    question: {
      cs: 'Jak vypadá tvůj typický den, kdy se učíš? Popiš mi svou rutinu.',
      en: 'What does a typical study day look like for you? Describe your routine.'
    }
  },
  {
    id: 'V2',
    category: 'learning_preferences',
    question: {
      cs: 'Když se chceš naučit něco nového, jak na to jdeš? Jaký způsob ti nejvíc vyhovuje?',
      en: 'When you want to learn something new, how do you approach it? What method works best for you?'
    }
  },
  {
    id: 'V3',
    category: 'goals',
    question: {
      cs: 'Jaké máš cíle ve studiu? Co bys chtěl dosáhnout v příštím roce?',
      en: 'What are your study goals? What would you like to achieve in the next year?'
    }
  },
  {
    id: 'V4',
    category: 'challenges',
    question: {
      cs: 'S čím nejvíc bojuješ při učení? Co ti dělá největší problémy?',
      en: 'What do you struggle with most when studying? What gives you the most trouble?'
    }
  },
  {
    id: 'V5',
    category: 'motivation',
    question: {
      cs: 'Co tě motivuje k učení? A co naopak ti motivaci bere?',
      en: 'What motivates you to study? And what takes away your motivation?'
    }
  }
];

export function getInterviewQuestionText(questionId: string, lang: 'cs' | 'en'): string {
  const question = interviewQuestions.find(q => q.id === questionId);
  return question ? question.question[lang] : '';
}

export function generateStudentPassportPrompt(
  exchanges: Array<{ questionId: string; question: string; transcript: string }>,
  lang: 'cs' | 'en'
): string {
  const transcriptText = exchanges
    .map(e => `Q: ${e.question}\nA: ${e.transcript}`)
    .join('\n\n');

  if (lang === 'cs') {
    return `Na základě následujícího rozhovoru se studentem vytvoř "Studentský pas" - komplexní profil studenta.

ROZHOVOR:
${transcriptText}

Odpověz v JSON formátu:
{
  "summary": "2-3 věty shrnující studenta jako osobnost",
  "studyHabits": "popis studijních návyků",
  "goals": "hlavní cíle studenta",
  "learningStyle": "preferovaný styl učení",
  "challenges": "hlavní výzvy a problémy",
  "strengths": ["silná stránka 1", "silná stránka 2", "silná stránka 3"],
  "areasForImprovement": ["oblast 1", "oblast 2"],
  "recommendations": ["doporučení 1", "doporučení 2", "doporučení 3"]
}`;
  }

  return `Based on the following interview with a student, create a "Student Passport" - a comprehensive student profile.

INTERVIEW:
${transcriptText}

Respond in JSON format:
{
  "summary": "2-3 sentences summarizing the student as a person",
  "studyHabits": "description of study habits",
  "goals": "main goals of the student",
  "learningStyle": "preferred learning style",
  "challenges": "main challenges and problems",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "areasForImprovement": ["area 1", "area 2"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"]
}`;
}
