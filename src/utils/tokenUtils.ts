import { QuizResults } from '../types';

/**
 * Generates a shareable token from quiz results
 * @param results - The quiz results object
 * @returns Base64 encoded token string
 */
export const generateToken = (results: QuizResults): string => {
  const json = JSON.stringify(results.allScores);
  return btoa(json);
};

/**
 * Decodes a token back to quiz results
 * @param token - Base64 encoded token string
 * @returns QuizResults object or null if invalid
 */
export const decodeToken = (token: string): QuizResults | null => {
  try {
    const decodedScores = JSON.parse(atob(token)) as Record<string, number>;
    
    // Validate that we have valid scores
    if (!decodedScores || typeof decodedScores !== 'object') {
      return null;
    }
    
    // Check that all values are numbers
    for (const score of Object.values(decodedScores)) {
      if (typeof score !== 'number' || isNaN(score)) {
        return null;
      }
    }
    
    // Reconstruct QuizResults object from scores
    const sortedArchetypes = Object.entries(decodedScores)
      .sort(([,a], [,b]) => b - a)
      .map(([archetype, score]) => ({ archetype, score }));
    
    if (sortedArchetypes.length === 0) {
      return null;
    }
    
    return {
      primaryArchetype: sortedArchetypes[0],
      allScores: decodedScores,
      sortedArchetypes
    };
  } catch (e) {
    console.error('Failed to decode token:', e);
    return null;
  }
};

/**
 * Creates a shareable URL from quiz results
 * @param results - The quiz results object
 * @returns Complete shareable URL
 */
export const createShareableUrl = (results: QuizResults): string => {
  const token = generateToken(results);
  return `${window.location.origin}/results/${token}`;
}; 