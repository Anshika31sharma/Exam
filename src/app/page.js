"use client";

import "./globals.css";
import { useState, useEffect } from "react";
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
import { BiMoon, BiSun } from "react-icons/bi";

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("isDarkMode") === "true";
    setIsDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("isDarkMode", String(newDarkMode));
    document.documentElement.classList.toggle("dark", newDarkMode);
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
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {isCompleted ? (
        <main className={`flex-1 p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="flex justify-between">
          <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Results</h2>
          <button onClick={toggleDarkMode} className={`px-4 py-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-300"} hover:bg-gray-400`}>
                  {isDarkMode ? <BiSun className="text-yellow-400" /> : <BiMoon className="text-gray-600" />}
                </button>
                </div>
          <ResultChart
            correctAnswers={correctAnswersCount}
            totalQuestions={questions.length}
          />
        </main>
      ) : (
        <>
          <aside className={`w-64 p-4 shadow-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
            <div className={`font-bold text-lg mb-6 ${isDarkMode ? "text-white" : "text-gray-800"}`}>ELT Global</div>
            <nav className="flex flex-col space-y-2">
              <a href="#" className={`flex items-center ${isDarkMode ? "text-orange-500" : "text-gray-700"} font-semibold`}>
                <Home className="mr-2" />
                Dashboard
              </a>
              <a href="#" className={`flex items-center ${isDarkMode ? "text-gray-300 hover:text-orange-500" : "text-gray-700 hover:text-orange-500"}`}>
                <Search className="mr-2" />
                Find
              </a>
              <a href="#" className={`flex items-center ${isDarkMode ? "text-gray-300 hover:text-orange-500" : "text-gray-700 hover:text-orange-500"}`}>
                <Mail className="mr-2" />
                Inbox
              </a>
              <a href="#" className={`flex items-center ${isDarkMode ? "text-gray-300 hover:text-orange-500" : "text-gray-700 hover:text-orange-500"}`}>
                <BarChart className="mr-2" />
                Analytics
              </a>
              <a href="#" className={`flex items-center ${isDarkMode ? "text-gray-300 hover:text-orange-500" : "text-gray-700 hover:text-orange-500"}`}>
                <Settings className="mr-2" />
                Settings
              </a>
            </nav>
          </aside>
          <main className={`flex-1 p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
            <header className="flex justify-between items-center mb-6">
              <h1 className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Exam</h1>
              <div className="flex gap-6">
                <button onClick={toggleDarkMode} className={`px-4 py-2 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-gray-300"} hover:bg-gray-400`}>
                  {isDarkMode ? <BiSun className="text-yellow-400" /> : <BiMoon className="text-gray-600" />}
                </button>
                <BellDot className={`text-gray-700 hover:text-orange-500 ${isDarkMode ? "text-gray-300 hover:text-orange-500" : "text-gray-700 hover:text-orange-500"}`} />
                <Speech className={`text-gray-700 hover:text-orange-500 ${isDarkMode ? "text-gray-300 hover:text-orange-500" : "text-gray-700 hover:text-orange-500"}`} />
                <UserPen className={`text-gray-700 hover:text-orange-500 ${isDarkMode ? "text-gray-300 hover:text-orange-500" : "text-gray-700 hover:text-orange-500"}`} />
              </div>
            </header>
            <div className={`bg-white shadow-md rounded-lg p-4 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
              <div className="flex mb-4 w-full justify-between">
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
                  onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
                  className={`px-4 py-2 rounded ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} hover:bg-gray-300`}
                >
                  Previous
                </button>
                <button
                  onClick={toggleFlag}
                  className={`px-4 py-2 rounded ${flaggedQuestions.has(currentQuestion) ? "bg-red-500" : "bg-yellow-400"} text-white hover:bg-opacity-80`}
                >
                  Flag
                </button>
                <button
                  onClick={() => setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1))}
                  className={`px-4 py-2 rounded ${isDarkMode ? "bg-gray-600" : "bg-gray-200"} hover:bg-gray-300`}
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
