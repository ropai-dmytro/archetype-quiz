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
  primaryArchetypes: string[];
  sortedArchetypes: Array<{
    archetype: string;
    score: number;
  }>;
  allScores: Record<string, number>;
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

export interface QuizQuestion {
  id: number;
  text: string;
  archetypes: string[];
}

export enum ArchetypeEnum {
  Explorer = 'Explorer',
  Sage = 'Sage',
  Hero = 'Hero',
  Creator = 'Creator',
  Caregiver = 'Caregiver',
  Jester = 'Jester',
  Lover = 'Lover',
  Ruler = 'Ruler',
  Magician = 'Magician',
  Everyman = 'Everyman',
  Outlaw = 'Outlaw',
  Innocent = 'Innocent',
} 