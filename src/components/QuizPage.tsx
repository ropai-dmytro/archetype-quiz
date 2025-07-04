import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { QuizPageProps, QuizResults } from '../types';
import './QuizPage.css';

const QuizPage: React.FC<QuizPageProps> = ({ onFinish, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number): void => {
    if (isAnswered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = (): void => {
    if (selectedAnswer === null) return;

    const answer = currentQuestion.answers[selectedAnswer];
    
    // Update scores
    const newScores = { ...scores };
    Object.entries(answer.scores).forEach(([archetype, score]) => {
      newScores[archetype] = (newScores[archetype] || 0) + score;
    });
    setScores(newScores);

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
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
            {currentQuestionIndex + 1} з {questions.length}
          </span>
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQuestion.text}</h2>
        
        <div className="answers-container">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className={`answer-button ${selectedAnswer === index ? 'selected' : ''} ${isAnswered ? 'answered' : ''}`}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            >
              <span className="answer-text">{answer.text}</span>
              {selectedAnswer === index && (
                <span className="check-icon">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">
        <button
          className={`next-button ${selectedAnswer !== null ? 'active' : ''}`}
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          {currentQuestionIndex < questions.length - 1 ? 'Далі' : 'Завершити'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage; 