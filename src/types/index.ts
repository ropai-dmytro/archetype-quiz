export interface ArchetypeData {
  name: string;
  description: string;
  traits: string[];
  fullDescription: string;
}

export interface Archetypes {
  [key: string]: ArchetypeData;
}

export interface QuizResults {
  primaryArchetype: {
    archetype: string;
    score: number;
  };
  allScores: Record<string, number>;
  sortedArchetypes: Array<{
    archetype: string;
    score: number;
  }>;
}

export interface HomePageProps {
  onStartQuiz: () => void;
}

export interface QuizPageProps {
  onFinish: (results: QuizResults) => void;
  onBack: () => void;
}

export interface ResultsPageProps {
  results: QuizResults;
  onRestart: () => void;
} 