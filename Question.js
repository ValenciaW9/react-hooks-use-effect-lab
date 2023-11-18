import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  const { id, prompt, answers, correctIndex } = question;

  const handleAnswer = (isCorrect) => {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  };

  return (
    <div>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={index} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>Time Remaining: {timeRemaining} seconds</h5>
    </div>
  );
}

export default Question;