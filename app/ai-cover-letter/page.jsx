"use client";
import { useState } from "react";
import CoverLetterForm from "./_components/CoverLetterForm";
import CoverLetterOutput from "./_components/CoverLetterOutput";

export default function AICoverLetterPage() {
  const [coverLetter, setCoverLetter] = useState("");

  const handleGenerate = (generatedText) => {
    setCoverLetter(generatedText); // Properly update the state at the top level
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-5xl flex gap-8">
        {/* Left Side: Cover Letter Form */}
        <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-primary mb-4">Cover Letter Generator</h1>
          <p className="text-lg text-gray-600 mb-6">Generate professional cover letters instantly.</p>
          <CoverLetterForm onGenerate={handleGenerate} />
        </div>

        {/* Right Side: Generated Cover Letter Output */}
        <div className="w-1/2 bg-white shadow-md rounded-lg p-6">
          <CoverLetterOutput coverLetter={coverLetter} />
        </div>
      </div>
    </div>
  );
}
