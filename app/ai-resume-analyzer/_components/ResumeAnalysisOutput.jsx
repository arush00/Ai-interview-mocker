"use client";

export default function ResumeAnalysisOutput({ analysis }) {
  if (!analysis) {
    return <p className="text-center text-gray-500">Upload a resume to see the analysis.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Resume Analysis Results</h2>
      <p className="text-gray-700"><strong>Feedback:</strong> {analysis.feedback}</p>
      <p className="text-gray-700"><strong>ATS Score:</strong> {analysis.atsScore}%</p>

      <h3 className="text-lg font-semibold mt-4">Suggestions:</h3>
      <ul className="list-disc list-inside text-gray-600">
        {analysis.suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mt-4">Helpful Videos:</h3>
      <ul className="list-disc list-inside text-blue-600">
        {analysis.youtubeLinks.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Watch Video {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
