"use client";

import { useState } from "react";
import ResumeForm from "./_components/ResumeForm";
import ResumePreview from "./_components/ResumePreview";
import ResumePDF from "./_components/ResumePDF";

export default function AIPoweredResumeBuilder() {
  const [resumeData, setResumeData] = useState({});

  const handleUpdate = (data) => {
    setResumeData(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">AI-Powered Resume Builder</h1>
        <p className="text-center text-gray-500 mt-2">Create a professional resume with AI assistance</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ResumeForm onUpdate={handleUpdate} />
        <div>
          <ResumePreview data={resumeData} />
          <ResumePDF data={resumeData} />
        </div>
      </div>
      <footer className="mt-8 text-center text-gray-500">
        © 2025 AI Interview Mocker. All rights reserved.
      </footer>
    </div>
  );
}