import { generateToken, decodeToken, createShareableUrl } from '../tokenUtils';
import { QuizResults } from '../../types';

describe('tokenUtils', () => {
  const mockResults: QuizResults = {
    primaryArchetype: {
      archetype: 'Sage',
      score: 45
    },
    allScores: {
      Sage: 45,
      Hero: 38,
      Explorer: 32,
      Creator: 29,
      Ruler: 25,
      Jester: 22,
      Caregiver: 19,
      Lover: 16,
      Magician: 13,
      Outlaw: 10,
      Everyman: 7,
      Innocent: 4
    },
    sortedArchetypes: [
      { archetype: 'Sage', score: 45 },
      { archetype: 'Hero', score: 38 },
      { archetype: 'Explorer', score: 32 },
      { archetype: 'Creator', score: 29 },
      { archetype: 'Ruler', score: 25 },
      { archetype: 'Jester', score: 22 },
      { archetype: 'Caregiver', score: 19 },
      { archetype: 'Lover', score: 16 },
      { archetype: 'Magician', score: 13 },
      { archetype: 'Outlaw', score: 10 },
      { archetype: 'Everyman', score: 7 },
      { archetype: 'Innocent', score: 4 }
    ]
  };

  describe('generateToken', () => {
    it('should generate a valid Base64 token from quiz results', () => {
      const token = generateToken(mockResults);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
      
      // Verify it's valid Base64
      expect(() => atob(token)).not.toThrow();
    });

    it('should generate consistent tokens for the same results', () => {
      const token1 = generateToken(mockResults);
      const token2 = generateToken(mockResults);
      
      expect(token1).toBe(token2);
    });
  });

  describe('decodeToken', () => {
    it('should decode a valid token back to quiz results', () => {
      const token = generateToken(mockResults);
      const decoded = decodeToken(token);
      
      expect(decoded).not.toBeNull();
      expect(decoded?.allScores).toEqual(mockResults.allScores);
      expect(decoded?.primaryArchetype).toEqual(mockResults.primaryArchetype);
      expect(decoded?.sortedArchetypes).toEqual(mockResults.sortedArchetypes);
    });

    it('should return null for invalid tokens', () => {
      const invalidTokens = [
        'invalid-base64',
        'not-a-json-string',
        '',
        'eyJpbnZhbGlkIjoidmFsdWUifQ==', // valid base64 but invalid JSON
      ];
      
      invalidTokens.forEach(token => {
        expect(decodeToken(token)).toBeNull();
      });
    });

    it('should return null for tokens with invalid score data', () => {
      const invalidScores = {
        Sage: 'not-a-number',
        Hero: NaN,
        Explorer: null
      };
      
      const invalidToken = btoa(JSON.stringify(invalidScores));
      expect(decodeToken(invalidToken)).toBeNull();
    });
  });

  describe('createShareableUrl', () => {
    it('should create a valid shareable URL', () => {
      const url = createShareableUrl(mockResults);
      
      expect(url).toMatch(/^https?:\/\/.+\/results\/.+/);
      expect(url).toContain('/results/');
      
      // Extract token from URL and verify it can be decoded
      const token = url.split('/results/')[1];
      const decoded = decodeToken(token);
      expect(decoded).not.toBeNull();
    });
  });

  describe('round-trip', () => {
    it('should maintain data integrity through encode/decode cycle', () => {
      const token = generateToken(mockResults);
      const decoded = decodeToken(token);
      
      expect(decoded).toEqual(mockResults);
    });
  });
}); 