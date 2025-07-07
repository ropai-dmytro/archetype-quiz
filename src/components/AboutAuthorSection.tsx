import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutAuthorSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="about-author-block">
      <div className="about-author-title">ПРО АВТОРА</div>
      <div className="about-author-content">
        <div className="author-photo">
          <img src="/anna.png" alt="Анна Ропай" />
        </div>
        <div className="author-info">
          <div className="author-name">Анна Ропай</div>
          <div className="author-description">Психолог і наставниця з особистого бренду.</div>
        </div>
      </div>
      <div className="author-bio">
        Спеціалізуюсь на роботі з архетипами, арт-терапії та психосоматиці. Я багато років вивчаю архетипи через психологію, арт-терапію, метафоричні карти, Таро як проективний інструмент та матриці долі. Це допомагає мені бачити людину об'ємно, її внутрішній світ, тіло, образ, поведінку, енергію та шлях.
      </div>
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <button 
          className="start-button green" 
          style={{ fontSize: '1.1rem', padding: '12px 36px', borderRadius: '999px' }}
          onClick={() => navigate('/about')}
        >
          Дізнатись більше
        </button>
      </div>
    </div>
  );
};

export default AboutAuthorSection; 