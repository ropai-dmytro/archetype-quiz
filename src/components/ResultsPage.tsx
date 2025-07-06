import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { archetypes } from '../data/questions';
import { ResultsPageProps } from '../types';
import { createShareableUrl } from '../utils/tokenUtils';
import './ResultsPage.css';

const svgLeaf = (
  <svg className="svg-decoration svg-leaf-top-left" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 160 Q80 80 160 40 Q120 120 40 160 Z" fill="#f5ecd7"/>
  </svg>
);
const svgLeaf2 = (
  <svg className="svg-decoration svg-leaf-bottom-right" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M160 40 Q120 120 40 160 Q80 80 160 40 Z" fill="#f5ecd7"/>
  </svg>
);

const ResultsPage: React.FC<ResultsPageProps> = ({ results, onRestart }) => {
  const { sortedArchetypes, allScores } = results;
  const top3 = sortedArchetypes.slice(0, 3);

  // Prepare data for radar chart
  const chartData = Object.entries(allScores).map(([archetype, score]) => ({
    archetype: archetypes[archetype].name,
    score: score,
    fullMark: Math.max(...Object.values(allScores))
  }));

  const handleShare = (): void => {
    const main = top3[0];
    const shareText = `Мій домінуючий архетип: ${archetypes[main.archetype].name}`;
    const shareUrl = createShareableUrl(results);
    
    if (navigator.share) {
      navigator.share({
        title: 'Мій архетип',
        text: shareText,
        url: shareUrl
      }).catch(() => {
        // Fallback to clipboard if share fails
        navigator.clipboard.writeText(`${shareText}\n\nПереглянути повний результат: ${shareUrl}`);
      });
    } else {
      // Fallback for browsers without share API
      navigator.clipboard.writeText(`${shareText}\n\nПереглянути повний результат: ${shareUrl}`);
    }
  };

  return (
    <div className="results-page" style={{ position: 'relative', overflow: 'hidden' }}>
      {svgLeaf}
      {svgLeaf2}
      <div className="results-header">
        <h1>
          <span className="decorative-a">А</span>рхетипи: Твій результат
        </h1>
        <p className="results-subtitle">Топ-3 архетипи, які найбільше проявлені у твоїй особистості</p>
      </div>

      <div className="primary-result" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        {top3.map((item, idx) => {
          const data = archetypes[item.archetype];
          return (
            <div className="archetype-card" key={item.archetype} style={{ maxWidth: 320, minWidth: 240, textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <img
                src={`/${item.archetype}.PNG`}
                alt={data.name}
                style={{ width: 120, height: 120, objectFit: 'cover', objectPosition: 'top', borderRadius: '50%', marginBottom: 16, background: '#e6e2d3', boxShadow: '0 4px 16px rgba(67,81,58,0.10)' }}
                loading="lazy"
              />
              <h2 style={{ fontWeight: 700, fontSize: '1.4rem', margin: '0 0 8px 0', color: '#43513a' }}>{data.name}</h2>
              <div style={{ fontWeight: 600, color: '#7e8d6f', marginBottom: 8 }}>{item.score} балів</div>
              <div style={{ fontSize: '1rem', color: '#43513a', marginBottom: 12 }}>{data.description}</div>
              <div style={{ fontSize: '0.95rem', color: '#7e8d6f' }}>
                <b>Ключові якості:</b> {data.traits.join(', ')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full description for the top archetype */}
      <div className="top-archetype-description" style={{ background: '#f3e8d2', color: '#43513a', borderRadius: 24, padding: 32, margin: '40px auto 24px auto', maxWidth: 700, boxShadow: '0 4px 24px rgba(67,81,58,0.10)', fontSize: '1.08rem', lineHeight: 1.7 }}>
        <h2 style={{ color: '#7b8c6a', fontWeight: 800, fontSize: '1.5rem', marginBottom: 18, textAlign: 'center' }}>
          {archetypes[top3[0].archetype].name}: повний опис
        </h2>
        <div style={{ whiteSpace: 'pre-line' }}>{archetypes[top3[0].archetype].fullDescription}</div>
      </div>

      <div className="chart-section">
        <h3>Профіль архетипів</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="archetype" 
                tick={{ fontSize: 12, fill: '#43513a' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, Math.max(...Object.values(allScores))]}
                tick={{ fontSize: 10, fill: '#7e8d6f' }}
              />
              <Radar
                name="Твій профіль"
                dataKey="score"
                stroke="#7e8d6f"
                fill="#a3b18a"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="all-results">
        <h3>Всі архетипи (за рейтингом)</h3>
        <div className="results-list">
          {results.sortedArchetypes.map((item, index) => (
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