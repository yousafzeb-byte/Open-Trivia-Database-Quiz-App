import React, { useState, useEffect } from "react";

export default function QuestionForm({
  userData,
  onQuestionFetched,
  onSubmitAnswer,
}) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        setLoading(true);
        setApiError("");
        setQuestion(null);

        // Build the API URL based on user selection
        const url = `https://opentdb.com/api.php?amount=1&category=${userData.category}&difficulty=${userData.difficulty}&type=multiple`;
        console.log("Fetching from:", url);

        const res = await fetch(url);
        const data = await res.json();
        console.log("API Data:", data);

        // If no questions found, try a fallback category (General Knowledge)
        if (data.response_code !== 0 || !data.results.length) {
          console.warn(
            "No questions found for that combo — retrying default category..."
          );

          const fallbackUrl = `https://opentdb.com/api.php?amount=1&category=9&difficulty=${userData.difficulty}&type=multiple`;
          const fallbackRes = await fetch(fallbackUrl);
          const fallbackData = await fallbackRes.json();
          console.log("Fallback Data:", fallbackData);

          if (
            fallbackData.response_code !== 0 ||
            !fallbackData.results.length
          ) {
            setApiError(
              "⚠️ No questions available right now. Please try again later."
            );
            setLoading(false);
            return;
          }

          const q = fallbackData.results[0];
          const answers = [...q.incorrect_answers, q.correct_answer].sort(
            () => Math.random() - 0.5
          );
          const questionData = { ...q, answers };
          setQuestion(questionData);
          onQuestionFetched(questionData);
          setLoading(false);
          return;
        }

        // Success: load question
        const q = data.results[0];
        const answers = [...q.incorrect_answers, q.correct_answer].sort(
          () => Math.random() - 0.5
        );
        const questionData = { ...q, answers };
        setQuestion(questionData);
        onQuestionFetched(questionData);
      } catch (err) {
        console.error("Fetch error:", err);
        setApiError(
          "⚠️ Error fetching question. Please check your internet or try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [userData, onQuestionFetched]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selected) {
      setError("⚠️ Please select an answer before submitting.");
      return;
    }

    const isCorrect = selected === question.correct_answer;
    onSubmitAnswer({
      isCorrect,
      correct: question.correct_answer,
    });
  };

  // --- Conditional UI States ---
  if (loading) {
    return <p>Loading question...</p>;
  }

  if (apiError) {
    return (
      <div className="question-form">
        <p className="error">{apiError}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  if (!question) {
    return <p>No question available right now. Please try again later.</p>;
  }

  // --- Render the question form ---
  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h2 dangerouslySetInnerHTML={{ __html: question.question }} />

      {question.answers.map((ans, index) => (
        <label key={index} className="answer-option">
          <input
            type="radio"
            name="answer"
            value={ans}
            onChange={(e) => setSelected(e.target.value)}
          />
          <span dangerouslySetInnerHTML={{ __html: ans }} />
        </label>
      ))}

      {error && <p className="error">{error}</p>}

      <button type="submit">Submit Answer</button>
    </form>
  );
}
