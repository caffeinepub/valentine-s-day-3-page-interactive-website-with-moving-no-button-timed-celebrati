import { useState } from 'react';
import QuestionPage from './pages/QuestionPage';
import CelebrationPage from './pages/CelebrationPage';
import FinalePage from './pages/FinalePage';

type PageState = 'question' | 'celebration' | 'finale';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('question');

  const handleYesClick = () => {
    setCurrentPage('celebration');
  };

  const handleCelebrationComplete = () => {
    setCurrentPage('finale');
  };

  return (
    <>
      {currentPage === 'question' && <QuestionPage onYesClick={handleYesClick} />}
      {currentPage === 'celebration' && <CelebrationPage onComplete={handleCelebrationComplete} />}
      {currentPage === 'finale' && <FinalePage />}
    </>
  );
}
