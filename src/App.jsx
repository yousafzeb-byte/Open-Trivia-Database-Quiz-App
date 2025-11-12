import { useState } from "react";
import HomePage from "./components/HomePage";
import QuestionForm from "./components/QuestionForm";
import Results from "./components/Results";
import "./index.css";

function App() {
  const [stage, setStage] = useState("home"); // "home" | "question" | "results"
  const [userData, setUserData] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);

  const handleStart = (data) => {
    setUserData(data);
    setStage("question");
  };

  const handleQuestionLoaded = (question) => {
    setQuestionData(question);
  };

  const handleAnswerSubmit = (answer) => {
    setUserAnswer(answer);
    setStage("results");
  };

  const handleRestart = () => {
    setUserData(null);
    setQuestionData(null);
    setUserAnswer(null);
    setStage("home");
  };

  return (
    <div className="app">
      {stage === "home" && <HomePage onStart={handleStart} />}
      {stage === "question" && (
        <QuestionForm
          userData={userData}
          onQuestionLoaded={handleQuestionLoaded}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}
      {stage === "results" && (
        <Results
          userData={userData}
          questionData={questionData}
          userAnswer={userAnswer}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
