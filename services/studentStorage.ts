export interface StudentProfile {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  results: {
    typology?: {
      dimensions: { dimension: string; leftLabel: string; rightLabel: string; leftScore: number; rightScore: number; label: string }[];
      overallProfile: string;
      tips: string[];
    };
    vak?: {
      visual: number;
      auditory: number;
      kinesthetic: number;
      label: string;
    };
    habits?: {
      score: number;
      maxScore: number;
      percent: number;
      label: string;
      tips: string[];
    };
    motivation?: {
      score: number;
      maxScore: number;
      percent: number;
      label: string;
      tips: string[];
    };
    strengths?: {
      areas: { label: string; score: number }[];
      topStrength: string;
      tips: string[];
    };
    chatReport?: {
      studentPassport: string;
      researchBlock: string;
      skills: { label: string; value: number }[];
    };
    synthesis?: {
      synthesis: string;
      studyTips: string[];
      youtubeVideos: { videoId: string; title: string; description: string }[];
    };
  };
}

const STORAGE_KEY = 'ai-navigator-students';

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function getStudents(): StudentProfile[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function getStudent(id: string): StudentProfile | null {
  const students = getStudents();
  return students.find(s => s.id === id) || null;
}

export function saveStudent(profile: Omit<StudentProfile, 'id' | 'createdAt' | 'updatedAt'>): StudentProfile {
  const students = getStudents();

  // Check if student with same name exists
  const existingIndex = students.findIndex(s => s.name.toLowerCase() === profile.name.toLowerCase());

  if (existingIndex >= 0) {
    // Update existing
    const updated: StudentProfile = {
      ...students[existingIndex],
      ...profile,
      updatedAt: Date.now(),
      results: {
        ...students[existingIndex].results,
        ...profile.results
      }
    };
    students[existingIndex] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return updated;
  } else {
    // Create new
    const newProfile: StudentProfile = {
      id: generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...profile
    };
    students.unshift(newProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return newProfile;
  }
}

export function updateStudentResults(
  name: string,
  results: Partial<StudentProfile['results']>
): StudentProfile | null {
  const students = getStudents();
  const index = students.findIndex(s => s.name.toLowerCase() === name.toLowerCase());

  if (index >= 0) {
    students[index] = {
      ...students[index],
      updatedAt: Date.now(),
      results: {
        ...students[index].results,
        ...results
      }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return students[index];
  }

  // Create new if doesn't exist
  return saveStudent({ name, results });
}

export function deleteStudent(id: string): void {
  const students = getStudents().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function getStudentByName(name: string): StudentProfile | null {
  const students = getStudents();
  return students.find(s => s.name.toLowerCase() === name.toLowerCase()) || null;
}
