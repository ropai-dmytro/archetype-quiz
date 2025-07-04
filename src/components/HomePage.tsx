import React, { useEffect, useRef } from 'react';
import { HomePageProps } from '../types';
import './HomePage.css';

const HomePage: React.FC<HomePageProps> = ({ onStartQuiz }) => {
  // Scroll reveal refs
  const defRef = useRef<HTMLDivElement>(null);
  const benRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (defRef.current) observer.observe(defRef.current);
    if (benRef.current) observer.observe(benRef.current);
    if (authorRef.current) observer.observe(authorRef.current);

    cardRefs.current.forEach((ref) => {
      if (ref) cardObserver.observe(ref);
    });

    return () => {
      observer.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  const benefits = [
    'Тим, хто шукає себе і хто хоче прийняти себе - архетипи допоможуть зрозуміти, хто ти є насправді, без масок і чужих очікувань.',
    'Тим, хто будує особистий бренд, бо архетипи - це основа твоєї унікальності та стилю комунікації, вони допомагають бути впізнаваною й автентичною.',
    'Психологам і коучам для глибшої діагностики особистості клієнта і для розуміння його життєвих сценаріїв, потреб і мотивації.',
    'Бренд-стратегам та маркетологам для створення автентичного бренду з чітким образом і енергією і для розробки комунікації, що зачіпає підсвідомі бажання аудиторії.',
    'Стилістам для побудови стилю клієнта, що відповідає його енергії, а не лише моді.',
    'HR-фахівцям для розуміння ролей людей у команді, сильних сторін і зон розвитку.',
    'Власникам бізнесу, щоб визначити архетип бренду і працювати не тільки на раціональному рівні, а й на емоційному та символічному.',
    'Фотографам для створення фотосесій, що передають архетипічну суть людини та бренду.',
    'БЕЗКОШТОВНО МОЖНА ВИЯВИТИ ВАШ ПРОВІДНИЙ АРХЕТИП І ДІЗНАТИСЬ РЕКОМЕНДАЦІЇ',
  ];

  return (
    <div className="home-page">
      <img src="/leaf.png" alt="Leaf" className="leaf-decor" />
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="decorative-a">A</span>РХЕТИПИ
          </h1>
          <p className="hero-subtitle">
            Знати свій архетип значить зрозуміти, хто ти є насправді, прийняти себе і проявитися у світі автентично.<br />
            Відкрий свій архетип і дозволь собі жити так, як задумано природою.
          </p>
        </div>
        <div className="cta-section">
          <button className="start-button" onClick={onStartQuiz}>
            ПРОЙТИ ТЕСТ
          </button>
          <p className="cta-note">Тест займе приблизно 15-20 хвилин</p>
        </div>
      </div>
      {/* Content blocks */}
      <div className="content">
        {/* Block 1: What are archetypes */}
        <div ref={defRef} className="archetype-definition-block scroll-reveal">
          <div className="archetype-benefits-title">ЩО ТАКЕ АРХЕТИПИ</div>
          <div className="archetype-definition-description">
            Архетипи — це універсальні психологічні паттерни, які існують у колективному підсвідомому людства. Вони є базовими моделями поведінки, емоцій та думок, які проявляються у міфах, казках, літературі та повсякденному житті.
            <br/><br/>
            Кожен архетип має свої унікальні характеристики, сильні сторони та виклики. Розуміння своїх домінуючих архетипів допомагає краще зрозуміти себе, свої мотиви та взаємодію з навколишнім світом.
          </div>
        </div>

        {/* Block 2: Who needs archetypes and why */}
        <div ref={benRef} className="archetype-benefits-block scroll-reveal">
          <div className="archetype-benefits-title">КОМУ ПОТРІБНІ АРХЕТИПИ І ЧИМ ВОНИ КОРИСНІ</div>
          <div className="archetype-benefits-description">
            {benefits.map((text, idx) => (
              <div 
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className={`benefit-card scroll-reveal${idx === benefits.length - 1 ? ' benefit-card-accent' : ''}`} 
                key={idx}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Block 3: About author */}
        <div ref={authorRef} className="about-author-block scroll-reveal">
          <div className="about-author-title">ПРО АВТОРА</div>
          <div className="about-author-content">
            <div className="author-photo">
              <img src="/anna.png" alt="Anna Ropai" />
            </div>
            <div className="author-info">
              <div className="author-name">Анна Ропай</div>
              <div className="author-description">Психолог і наставниця з особистого бренду.
              </div>
            </div>
          </div>
          <div className="author-bio">
          Спеціалізуюсь на роботі з архетипами, арт-терапії та психосоматиці. Я багато років вивчаю архетипи через психологію, арт-терапію, метафоричні 
          карти, Таро як проективний інструмент та матриці долі. Це допомагає мені бачити
          людину об'ємно, її внутрішній світ, тіло, образ, поведінку, енергію та шлях.
          </div>
          <div className="author-social" style={{ marginTop: 20, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <a href="https://www.instagram.com/anna_ropai/" target="_blank" rel="noopener noreferrer">
              <img src="/insta.png" alt="Instagram" style={{ width: 32, height: 32, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', background: '#fff', objectFit: 'contain', display: 'inline-block', marginLeft: 8 }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;