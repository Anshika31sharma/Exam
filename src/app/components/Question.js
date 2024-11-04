import { useState } from "react";

export default function Question({ question, onAnswer, isFlagged }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold">{question.text}</h2>
      {question.options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(option)}
          className={`block mt-2 p-2 w-full text-left border rounded ${
            selectedAnswer === option ? "bg-blue-500 text-white" : 
            isFlagged && selectedAnswer === null ? "bg-red-500 text-white" : "bg-gray-100"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
