import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { QuizResults } from './types';

type PageType = 'home' | 'quiz' | 'results';

function App(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);

  const startQuiz = (): void => {
    setCurrentPage('quiz');
  };

  const finishQuiz = (results: QuizResults): void => {
    setQuizResults(results);
    setCurrentPage('results');
  };

  const goHome = (): void => {
    setCurrentPage('home');
    setQuizResults(null);
  };

  const renderPage = (): React.ReactElement => {
    switch (currentPage) {
      case 'quiz':
        return <QuizPage onFinish={finishQuiz} onBack={goHome} />;
      case 'results':
        return <ResultsPage results={quizResults!} onRestart={goHome} />;
      default:
        return <HomePage onStartQuiz={startQuiz} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App; 