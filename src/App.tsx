import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import AuthorPage from './components/AuthorPage';
import { QuizResults } from './types';
import { generateToken, decodeToken } from './utils/tokenUtils';
import { initGA, trackPageView } from './utils/analytics';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
  useLocation,
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

// Component to track page views
const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    const pageName = location.pathname === '/' ? 'Home' : 
                    location.pathname === '/archetype-quiz' ? 'Home' :
                    location.pathname === '/quiz' ? 'Quiz' :
                    location.pathname.startsWith('/results') ? 'Results' :
                    location.pathname === '/about' ? 'About' : 'Unknown';
    
    trackPageView(pageName);
  }, [location]);

  return null;
};

// Wrapper for HomePage to handle navigation
const HomePageWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return <HomePage onStartQuiz={handleStartQuiz} />;
};

const App: React.FC = () => {
  useEffect(() => {
    // Initialize Google Analytics
    initGA();
  }, []);

  return (
    <Router>
      <div className="App">
        <PageTracker />
        <Routes>
          <Route path="/" element={<Navigate to="/archetype-quiz" replace />} />
          <Route path="/archetype-quiz" element={<HomePageWrapper />} />
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