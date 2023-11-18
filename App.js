import React from 'react';
import Question from './Question';

const App = () => {
  const handleAnswered = (isCorrect) => {
    // Logic to handle the user's answer
    if (isCorrect) {
      console.log('Correct answer!');
      // Update score, move to next question, etc.
    } else {
      console.log('Wrong answer!');
      // Update score, display correct answer, etc.
    }
  };

  return (
    <div>
      {/* Other JSX code */}
      <Question onAnswered={handleAnswered} />
    </div>
  );
};

export default App;
