import React, { useState, useEffect } from 'react';
import quizData from '../data/questions';
import { QuizPageProps, QuizResults } from '../types';
import { useAnalytics } from '../utils/analytics';
import './QuizPage.css';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const QuizPage: React.FC<QuizPageProps> = ({ onFinish, onBack }) => {
  const { trackQuizComplete } = useAnalytics();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof quizData.questions>([]);

  // Shuffle questions only once on mount
  useEffect(() => {
    setShuffledQuestions(shuffleArray(quizData.questions));
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progress = shuffledQuestions.length > 0 ? ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100 : 0;

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (optionIndex: number): void => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleNext = (): void => {
    if (selectedOption === null) return;
    if (!currentQuestion) return;

    const option = quizData.options[selectedOption];
    const weight = option.weight;

    // Update scores
    const newScores = { ...scores };
    (currentQuestion.archetypes as string[]).flat().forEach((archetype: string) => {
      newScores[archetype] = (newScores[archetype] || 0) + weight;
    });
    setScores(newScores);

    // Move to next question or finish
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final results
      const sortedArchetypes = Object.entries(newScores)
        .sort(([,a], [,b]) => b - a)
        .map(([archetype, score]) => ({ archetype, score }));
      const results: QuizResults = {
        primaryArchetypes: sortedArchetypes.length > 0 ? [sortedArchetypes[0].archetype] : [],
        allScores: newScores,
        sortedArchetypes
      };
      
      // Track quiz completion
      trackQuizComplete();
      
      onFinish(results);
    }
  };

  const handleBack = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onBack();
    }
  };

  if (shuffledQuestions.length === 0) return null;

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <button className="back-button" onClick={handleBack}>
          ← Назад
        </button>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">
            {currentQuestionIndex + 1} з {shuffledQuestions.length}
          </span>
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQuestion.text}</h2>
        <div className="answers-container">
          {quizData.options.map((option, index) => (
            <button
              key={index}
              className={`answer-button ${selectedOption === index ? 'selected' : ''} ${isAnswered ? 'answered' : ''}`}
              onClick={() => handleOptionSelect(index)}
              disabled={isAnswered}
            >
              <span className="answer-text">{option.label}</span>
              {selectedOption === index && (
                <span className="check-icon">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">
        <button
          className={`next-button ${selectedOption !== null ? 'active' : ''}`}
          onClick={handleNext}
          disabled={selectedOption === null}
        >
          {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Далі' : 'Завершити'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage; 