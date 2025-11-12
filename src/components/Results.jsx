export default function Results({
  userData,
  questionData,
  userAnswer,
  onRestart,
}) {
  const correct = userAnswer === questionData.correct_answer;

  return (
    <div className="results-container">
      <h2>Results</h2>
      <p>
        {userData.name}, you {correct ? "✅ got it right!" : "❌ got it wrong."}
      </p>

      {!correct && (
        <p>
          The correct answer was:{" "}
          <strong
            dangerouslySetInnerHTML={{ __html: questionData.correct_answer }}
          />
        </p>
      )}

      <button onClick={onRestart}>Try Another Question</button>
    </div>
  );
}
