import React, { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import AuthorPage from './components/AuthorPage';
import { QuizResults } from './types';
import { generateToken, decodeToken } from './utils/tokenUtils';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from 'react-router-dom';

// Wrapper for QuizPage to handle navigation
const QuizWrapper: React.FC = () => {
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);

  const finishQuiz = (results: QuizResults) => {
    setQuizResults(results);
    // Generate token from results and navigate to tokenized URL
    const token = generateToken(results);
    navigate(`/results/${token}`);
  };

  return <QuizPage onFinish={finishQuiz} onBack={() => navigate('/')} />;
};

// Wrapper for ResultsPage to handle both state and token
const ResultsWrapper: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  // Try to get results from location state first (for direct navigation)
  const state = (window.history.state && window.history.state.usr) || {};
  let results: QuizResults | null = state.results || null;

  // If no state results, try to decode from token
  if (!results && token) {
    results = decodeToken(token);
  }

  if (!results) {
    return <Navigate to="/" replace />;
  }

  const handleRestart = () => {
    navigate('/', { replace: true });
  };

  return <ResultsPage results={results} onRestart={handleRestart} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/archetype-quiz" replace />} />
          <Route path="/archetype-quiz" element={<HomePage />} />
          <Route path="/quiz" element={<QuizWrapper />} />
          <Route path="/results/:token" element={<ResultsWrapper />} />
          <Route path="/about" element={<AuthorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 