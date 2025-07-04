import React, { useState, useEffect } from 'react';
import quizData from '../data/questions';
import { QuizPageProps, QuizResults } from '../types';
import './QuizPage.css';

const QuizPage: React.FC<QuizPageProps> = ({ onFinish, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

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

    const option = quizData.options[selectedOption];
    const archetype = currentQuestion.archetype;
    const weight = option.weight;

    // Update scores
    const newScores = { ...scores };
    newScores[archetype] = (newScores[archetype] || 0) + weight;
    setScores(newScores);

    // Move to next question or finish
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final results
      const sortedArchetypes = Object.entries(newScores)
        .sort(([,a], [,b]) => b - a)
        .map(([archetype, score]) => ({ archetype, score }));
      const results: QuizResults = {
        primaryArchetype: sortedArchetypes[0],
        allScores: newScores,
        sortedArchetypes
      };
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
            {currentQuestionIndex + 1} з {quizData.questions.length}
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
          {currentQuestionIndex < quizData.questions.length - 1 ? 'Далі' : 'Завершити'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage; 