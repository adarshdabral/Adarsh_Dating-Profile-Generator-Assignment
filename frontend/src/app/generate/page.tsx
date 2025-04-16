"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();
      setDescription(data.description);
    } catch (error) {
      console.error("Error generating description:", error);
    }
  };

  return (
    <div className="p-6">
      <textarea
        className="w-full border p-2"
        rows={4}
        onChange={(e) => setAnswers(e.target.value.split(","))}
        placeholder="Enter interests separated by commas..."
      />
      <button
        onClick={handleSubmit}
        className="mt-2 bg-black text-white px-4 py-2 rounded"
      >
        Generate
      </button>
      {description && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-lg font-bold">Generated Description</h2>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
