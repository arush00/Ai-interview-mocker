"use client";
import { useState } from "react";

const CoverLetterForm = ({ onGenerate }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const generateCoverLetter = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, experience, skills }),
      });

      const data = await response.json();
      onGenerate(data.coverLetter); // Pass the cover letter to the parent component
    } catch (error) {
      console.error("Error generating cover letter:", error);
      onGenerate("Failed to generate cover letter. Please try again.");
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateCoverLetter();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Enter job title"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block text-gray-700 font-semibold mb-2">Experience (in years)</label>
      <input
        type="text"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        placeholder="Enter years of experience"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block text-gray-700 font-semibold mb-2">Skills</label>
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="Enter your key skills"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Cover Letter"}
      </button>
    </form>
  );
};

export default CoverLetterForm;
