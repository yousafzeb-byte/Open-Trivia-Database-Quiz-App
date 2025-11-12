import { useState } from "react";

export default function HomePage({ onStart }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    difficulty: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, category, difficulty } = formData;
    if (!name || !category || !difficulty) {
      setError("⚠️ Please fill out all fields.");
      return;
    }
    setError("");
    onStart(formData);
  };

  return (
    <div className="home-container">
      <h1>🎯 Mini Quiz App</h1>
      <p>
        Welcome! Enter your name and choose a category and difficulty to begin.
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </label>

        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">--Select a Category--</option>
            <option value="9">General Knowledge</option>
            <option value="21">Sports</option>
            <option value="23">History</option>
            <option value="17">Science & Nature</option>
          </select>
        </label>

        <label>
          Difficulty:
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="">--Select Difficulty--</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        {error && <p className="error">{error}</p>}
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
}
