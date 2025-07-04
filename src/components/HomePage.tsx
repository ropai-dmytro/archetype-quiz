import React from 'react';
import { HomePageProps } from '../types';
import './HomePage.css';

const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-accent">Відкрий</span> свій архетип
          </h1>
          <p className="hero-subtitle">
            Дізнайся, який архетип найкраще описує твою особистість та життєвий шлях
          </p>
        </div>
        <div className="hero-visual">
          <div className="archetype-grid">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="archetype-dot" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="info-card">
          <h2>Що таке архетипи?</h2>
          <p>
            Архетипи — це універсальні психологічні патерни, які описують різні аспекти людської особистості. 
            Вони допомагають нам зрозуміти себе, свої мотиви та життєвий шлях.
          </p>
        </div>

        <div className="info-card">
          <h2>Про тест</h2>
          <p>
            Цей тест складається з 20 питань, які допоможуть визначити твій домінуючий архетип. 
            Відповідай щиро, не замислюючись довго над кожною відповіддю.
          </p>
        </div>

        <div className="info-card">
          <h2>Про автора</h2>
          <p>
            Тест базується на роботі Карла Юнга та сучасних дослідженнях психології особистості. 
            Він допомагає людям краще зрозуміти себе та свої взаємини з оточуючим світом.
          </p>
        </div>
      </div>

      <div className="cta-section">
        <button className="start-button" onClick={onStartQuiz}>
          <span className="button-text">Почати тест</span>
          <span className="button-icon">→</span>
        </button>
        <p className="cta-note">Тест займе приблизно 5-7 хвилин</p>
      </div>
    </div>
  );
};

export default HomePage; 