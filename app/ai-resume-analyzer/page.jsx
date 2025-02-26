"use client";

import React, { useState } from "react";
import ResumeUploadForm from "./_components/ResumeUploadForm";
import ResumeAnalysisOutput from "./_components/ResumeAnalysisOutput";

export default function ResumeAnalyzer() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Resume Analyzer</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        <ResumeUploadForm onAnalysisComplete={setAnalysis} />
        <ResumeAnalysisOutput analysis={analysis} />
      </div>
    </div>
  );
}
