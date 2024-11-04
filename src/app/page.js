"use client";

import "./globals.css";
import { useState } from "react";
import Timer from "./components/Timer";
import Question from "./components/Question";
import Navigation from "./components/Navigation";
import ResultChart from "./components/ResultChart";
import questions from "./utils/questions";
import {
  Home,
  Search,
  Mail,
  BarChart,
  Settings,
  Speech,
  BellDot,
  UserPen,
} from "lucide-react";

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleTimeUp = () => {
    alert("Time's up! Submitting exam...");
    setIsCompleted(true);
  };

  const handleSubmit = () => {
    setIsCompleted(true);
  };

  const hasAnsweredHalf =
    Object.keys(answers).length >= Math.ceil(questions.length / 2);
  const correctAnswersCount = questions.reduce((count, question, index) => {
    return answers[index] === question.answer ? count + 1 : count;
  }, 0);

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  return (
    <div className="flex h-screen">
      {isCompleted ? (
        <main className="flex-1 bg-gray-50 p-6">
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <ResultChart
            correctAnswers={correctAnswersCount}
            totalQuestions={questions.length}
          />
        </main>
      ) : (
        <>
          <aside className="w-64 bg-gray-100 p-4 shadow-lg">
            <div className="font-bold text-lg mb-6">ELT Global</div>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="flex items-center text-orange-500 font-semibold"
              >
                <Home className="mr-2" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <Search className="mr-2" />
                Find
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <Mail className="mr-2" />
                Inbox
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <BarChart className="mr-2" />
                Analytics
              </a>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:text-orange-500"
              >
                <Settings className="mr-2" />
                Settings
              </a>
            </nav>
          </aside>
          <main className="flex-1 bg-gray-50 p-6">
            <header className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Exam</h1>
              <div className=" flex gap-6">
                <BellDot className="text-gray-700 hover:text-orange-500" />
                <Speech className="text-gray-700 hover:text-orange-500" />
                <UserPen className="text-gray-700 hover:text-orange-500" />
              </div>
            </header>

            <div className="bg-white shadow-md rounded-lg p-4">
              <div className=" flex mb-4 w-full justify-between">
                <Navigation
                  totalQuestions={questions.length}
                  currentQuestion={currentQuestion}
                  onNavigate={setCurrentQuestion}
                />
                <Timer totalTime={3600} onTimeUp={handleTimeUp} />
              </div>

              <Question
                question={questions[currentQuestion]}
                onAnswer={handleAnswer}
                isFlagged={flaggedQuestions.has(currentQuestion)}
              />

              <div className="flex justify-between mt-4">
                <button
                  onClick={() =>
                    setCurrentQuestion((prev) => Math.max(prev - 1, 0))
                  }
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Previous
                </button>
                <button
                  onClick={toggleFlag}
                  className={`px-4 py-2 rounded ${
                    flaggedQuestions.has(currentQuestion)
                      ? "bg-red-500"
                      : "bg-yellow-400"
                  } text-white hover:bg-opacity-80`}
                >
                  Flag
                </button>
                <button
                  onClick={() =>
                    setCurrentQuestion((prev) =>
                      Math.min(prev + 1, questions.length - 1)
                    )
                  }
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Next
                </button>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={handleSubmit}
                  className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
                  disabled={!hasAnsweredHalf}
                >
                  End and Submit
                </button>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
