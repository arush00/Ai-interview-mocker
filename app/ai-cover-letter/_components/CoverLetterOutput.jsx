const CoverLetterOutput = ({ coverLetter }) => {
  return (
    <div className="mt-6 p-4 border border-gray-300 rounded bg-white shadow-md min-h-[200px]">
      <h3 className="text-lg font-bold">Generated Cover Letter:</h3>
      <p className="mt-2 whitespace-pre-wrap">{coverLetter || "No cover letter generated yet."}</p>
    </div>
  );
};

export default CoverLetterOutput;
