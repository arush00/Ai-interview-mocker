"use client";

import { useState } from "react";

// Configuration for dynamic form fields
const formFields = [
  { name: "name", label: "Full Name", type: "text", placeholder: "Full Name" },
  { name: "email", label: "Email", type: "email", placeholder: "Email" },
  { name: "phone", label: "Phone", type: "text", placeholder: "Phone" },
  { name: "address", label: "Address", type: "text", placeholder: "Address" },
  { name: "summary", label: "Professional Summary", type: "textarea", placeholder: "Professional Summary" },
  { name: "experience", label: "Work Experience", type: "textarea", placeholder: "Work Experience (e.g., Job Title, Company, Dates, Description)" },
  { name: "skills", label: "Skills", type: "textarea", placeholder: "Skills (comma-separated)" },
  { name: "education", label: "Education", type: "textarea", placeholder: "Education (e.g., Degree, Institution, Dates)" },
  { name: "certifications", label: "Certifications", type: "textarea", placeholder: "Certifications (e.g., Name, Year)" },
  { name: "color", label: "Resume Border Color", type: "color", placeholder: "" },
];

export default function ResumeForm({ onUpdate }) {
  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [suggestions, setSuggestions] = useState({});

  // Simulated AI suggestion function (dynamic for each field)
  const getAISuggestions = (field, value) => {
    if (!value) return "";
    switch (field) {
      case "summary":
        return `Results-driven ${value.toLowerCase()} with expertise in [specific skills]. Proven track record of success and customer satisfaction.`;
      case "experience":
        return `${value} - Spearheaded key initiatives, improving efficiency by [X]% and delivering measurable results.`;
      case "skills":
        return `${value}, Leadership, Problem-solving, Technical Proficiency`;
      default:
        return value;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const suggestion = getAISuggestions(name, value);
    setSuggestions((prev) => ({ ...prev, [name]: suggestion }));

    onUpdate(updatedData);
  };

  const applySuggestion = (field) => {
    if (suggestions[field]) {
      const updatedData = { ...formData, [field]: suggestions[field] };
      setFormData(updatedData);
      onUpdate(updatedData);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Resume Form</h2>
      <div className="space-y-4">
        {formFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded"
              />
            ) : field.type === "color" ? (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-12 h-12"
                title={field.label}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full p-2 border rounded"
              />
            )}
            {field.name in suggestions && suggestions[field.name] && (
              <button
                onClick={() => applySuggestion(field.name)}
                className="text-blue-500 text-sm mt-1"
              >
                Apply AI Suggestion: {suggestions[field.name]}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}