import React, { useState, useEffect } from 'react';

const Question = ({ onAnswered }) => {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
    }

    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  return (
    <div>
      <h2>Question</h2>
      <p>Time remaining: {timeRemaining} seconds</p>
      {/* Rest of the question component */}
    </div>
  );
};

export default Question;