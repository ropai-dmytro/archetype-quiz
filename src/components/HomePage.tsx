import React, { useEffect, useRef } from 'react';
import { HomePageProps } from '../types';
import './HomePage.css';
import AboutAuthorSection from './AboutAuthorSection';

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
          <div className="archetype-definition-title">ЩО ТАКЕ АРХЕТИПИ</div>
          <div className="archetype-definition-description">
            Архетипи - це універсальні психологічні паттерни, які існують у колективному підсвідомому людства. Вони є базовими моделями поведінки, емоцій та думок, які проявляються у міфах, казках, літературі та повсякденному житті.
            <br /><br />
            Кожен архетип має свої унікальні характеристики, сильні сторони та виклики. Розуміння своїх домінуючих архетипів допомагає краще зрозуміти себе, свої мотиви та взаємодію з навколишнім світом.
          </div>
        </div>

        {/* Block 2: Who needs archetypes and why */}
        <div ref={benRef} className="archetype-benefits-block scroll-reveal">
          <div className="archetype-benefits-title">КОМУ ПОТРІБНІ АРХЕТИПИ І ЧИМ ВОНИ КОРИСНІ</div>
          <div className="archetype-benefits-cards-grid">
            {[
              {
                icon: (
                  <svg width="28" height="28" fill="none" stroke="#f3e8d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                ),
                title: 'Для тих, хто шукає себе',
                desc: 'Архетипи допоможуть зрозуміти, хто ти є насправді, без масок і чужих очікувань.'
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" stroke="#f3e8d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>
                ),
                title: 'Для особистого бренду',
                desc: 'Архетипи - це основа твоєї унікальності та стилю комунікації, вони допомагають бути впізнаваною й автентичною.'
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" stroke="#f3e8d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                ),
                title: 'Для психологів і коучів',
                desc: 'Для глибшої діагностики особистості клієнта і для розуміння його життєвих сценаріїв, потреб і мотивації.'
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" stroke="#f3e8d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
                ),
                title: 'Для бренд-стратегам',
                desc: 'Для створення автентичного бренду з чітким образом і енергією і для розробки комунікації, що зачіпає підсвідомі бажання аудиторії.'
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" stroke="#f3e8d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                ),
                title: 'Для стилістам',
                desc: 'Для побудови стилю клієнта, що відповідає його енергії, а не лише моді.'
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" stroke="#f3e8d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
                ),
                title: 'Для HR-фахівцям',
                desc: 'Для розуміння ролей людей у команді, сильних сторін і зон розвитку.'
              }
            ].map((card, idx) => (
              <div className="benefit-card-v2" key={idx}>
                <div className="benefit-card-icon-wrap">{card.icon}</div>
                <div>
                  <div className="benefit-card-title">{card.title}</div>
                  <div className="benefit-card-desc">{card.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Block 3: About author */}
        <div ref={authorRef} className="scroll-reveal">
          <AboutAuthorSection/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;