import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/problems`);
      if (!res.ok) throw new Error("Failed to fetch problems");
      const data = await res.json();
      setProblems(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const addProblem = async (problemData) => {
    try {
      const res = await fetch(`${API_URL}/problems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(problemData),
      });
      if (!res.ok) throw new Error("Failed to add problem");
      const newProblem = await res.json();
      setProblems((prev) => [newProblem, ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateProblem = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/problems/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Failed to update problem");
      const updatedProblem = await res.json();
      setProblems((prev) =>
        prev.map((p) => (p._id === id || p.id === id ? updatedProblem : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProblem = async (id) => {
    try {
      const res = await fetch(`${API_URL}/problems/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete problem");
      setProblems((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return { problems, loading, error, addProblem, updateProblem, deleteProblem };
};
