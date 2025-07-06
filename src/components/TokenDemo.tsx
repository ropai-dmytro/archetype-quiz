import React, { useState } from 'react';
import { generateToken, decodeToken, createShareableUrl } from '../utils/tokenUtils';
import { QuizResults } from '../types';

const TokenDemo: React.FC = () => {
  const [demoResults, setDemoResults] = useState<QuizResults>({
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
  });

  const [generatedToken, setGeneratedToken] = useState<string>('');
  const [shareableUrl, setShareableUrl] = useState<string>('');
  const [decodedResults, setDecodedResults] = useState<QuizResults | null>(null);

  const handleGenerateToken = () => {
    const token = generateToken(demoResults);
    const url = createShareableUrl(demoResults);
    setGeneratedToken(token);
    setShareableUrl(url);
  };

  const handleDecodeToken = () => {
    if (generatedToken) {
      const decoded = decodeToken(generatedToken);
      setDecodedResults(decoded);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareableUrl);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Token Generation Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Demo Results</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(demoResults.allScores, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleGenerateToken}
          style={{ 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Generate Token
        </button>
      </div>

      {generatedToken && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Generated Token</h3>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px', 
            wordBreak: 'break-all',
            fontFamily: 'monospace'
          }}>
            {generatedToken}
          </div>
          
          <h3>Shareable URL</h3>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px', 
            wordBreak: 'break-all',
            fontFamily: 'monospace'
          }}>
            {shareableUrl}
          </div>
          
          <button 
            onClick={handleCopyUrl}
            style={{ 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Copy URL
          </button>
        </div>
      )}

      {generatedToken && (
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={handleDecodeToken}
            style={{ 
              background: '#17a2b8', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Decode Token
          </button>
        </div>
      )}

      {decodedResults && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Decoded Results</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {JSON.stringify(decodedResults.allScores, null, 2)}
          </pre>
          
          <div style={{ 
            background: decodedResults === demoResults ? '#d4edda' : '#f8d7da', 
            padding: '10px', 
            borderRadius: '4px',
            color: decodedResults === demoResults ? '#155724' : '#721c24'
          }}>
            {decodedResults === demoResults 
              ? '✅ Results match perfectly!' 
              : '❌ Results do not match'
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenDemo; 