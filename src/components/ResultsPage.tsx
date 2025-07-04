import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { archetypes } from '../data/questions';
import { ResultsPageProps } from '../types';
import './ResultsPage.css';

const ResultsPage: React.FC<ResultsPageProps> = ({ results, onRestart }) => {
  const { primaryArchetype, allScores, sortedArchetypes } = results;
  const primaryArchetypeData = archetypes[primaryArchetype.archetype];

  // Prepare data for radar chart
  const chartData = Object.entries(allScores).map(([archetype, score]) => ({
    archetype: archetypes[archetype].name,
    score: score,
    fullMark: Math.max(...Object.values(allScores))
  }));

  const handleShare = (): void => {
    if (navigator.share) {
      navigator.share({
        title: 'Мій архетип',
        text: `Мій домінуючий архетип: ${primaryArchetypeData.name}`,
        url: window.location.href
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(`Мій домінуючий архетип: ${primaryArchetypeData.name}`);
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`Мій домінуючий архетип: ${primaryArchetypeData.name}`);
    }
  };

  return (
    <div className="results-page">
      <div className="results-header">
        <h1>Твій результат</h1>
        <p className="results-subtitle">Відкрий свій домінуючий архетип</p>
      </div>

      <div className="primary-result">
        <div className="archetype-card">
          <div className="archetype-header">
            <h2 className="archetype-name">{primaryArchetypeData.name}</h2>
            <div className="archetype-score">
              <span className="score-number">{primaryArchetype.score}</span>
              <span className="score-label">балів</span>
            </div>
          </div>
          
          <p className="archetype-description">
            {primaryArchetypeData.description}
          </p>
          
          <div className="archetype-traits">
            <h3>Ключові якості:</h3>
            <div className="traits-list">
              {primaryArchetypeData.traits.map((trait, index) => (
                <span key={index} className="trait-tag">{trait}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3>Профіль архетипів</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="archetype" 
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, Math.max(...Object.values(allScores))]}
                tick={{ fontSize: 10, fill: '#999' }}
              />
              <Radar
                name="Твій профіль"
                dataKey="score"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="all-results">
        <h3>Всі архетипи (за рейтингом)</h3>
        <div className="results-list">
          {sortedArchetypes.map((item, index) => (
            <div key={item.archetype} className="result-item">
              <div className="result-rank">#{index + 1}</div>
              <div className="result-info">
                <div className="result-name">{archetypes[item.archetype].name}</div>
                <div className="result-score">{item.score} балів</div>
              </div>
              <div className="result-bar">
                <div 
                  className="result-fill" 
                  style={{ 
                    width: `${(item.score / Math.max(...Object.values(allScores))) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button className="restart-button" onClick={onRestart}>
          Пройти тест ще раз
        </button>
        <button className="share-button" onClick={handleShare}>
          Поділитися результатом
        </button>
      </div>
    </div>
  );
};

export default ResultsPage; 