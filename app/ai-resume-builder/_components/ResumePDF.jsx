"use client";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function ResumePDF({ data }) {
  const {
    name,
    email,
    phone,
    address,
    summary,
    experience,
    skills,
    education,
    certifications,
    color = "#800000", // Default maroon color
  } = data;

  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 10;
    let y = margin;

    // Set font to Arial (or Helvetica as fallback)
    doc.setFont("Arial");
    doc.setTextColor(0, 0, 0); // Black text (#000000)
    doc.setDrawColor(color); // Maroon border color

    // Header (Name)
    doc.setFontSize(28);
    doc.text(name || "Arush Chaubey", doc.internal.pageSize.width / 2, y, { align: "center" });
    doc.setLineWidth(2);
    doc.line(margin, y + 2, doc.internal.pageSize.width - margin, y + 2); // Maroon line under name
    y += 20;

    // Two-column layout
    const pageWidth = doc.internal.pageSize.width;
    const leftColumnWidth = 80; // Adjusted for better spacing
    const rightColumnWidth = pageWidth - leftColumnWidth - (margin * 2);

    // Left Column (CONTACT, SKILLS, EDUCATION, CERTIFICATIONS)
    doc.setFontSize(14);
    doc.text("CONTACT", margin, y);
    y += 5;
    doc.setFontSize(12);
    const contactText = [
      address || "Pasadena, CA 91003",
      `Mobile: ${phone || "9137432518"}`,
      email || "chaubeyarush1228@gmail.com",
    ];
    contactText.forEach((line, index) => {
      doc.text(line, margin, y + (index * 6));
    });
    y += contactText.length * 6 + 15;

    doc.setFontSize(14);
    doc.text("SKILLS", margin, y);
    y += 5;
    doc.setFontSize(12);
    const skillsList = (skills || "Python, Excel, Problem-solving, Team Collaboration")
      .split(",")
      .filter((skill) => skill.trim())
      .map((skill) => `• ${skill.trim()}`);
    skillsList.forEach((skill, index) => {
      doc.text(skill, margin, y + (index * 6));
    });
    y += skillsList.length * 6 + 15;

    doc.setFontSize(14);
    doc.text("EDUCATION", margin, y);
    y += 5;
    doc.setFontSize(12);
    doc.text(education || "Higher Secondary and Graduate School", margin, y);
    y += 10;

    doc.setFontSize(14);
    doc.text("CERTIFICATIONS", margin, y);
    y += 5;
    doc.setFontSize(12);
    doc.text(
      certifications || "List specific certifications here (e.g., Name, Year)",
      margin,
      y
    );

    // Right Column (PROFESSIONAL SUMMARY, WORK HISTORY)
    y = margin + 20; // Reset y for right column with extra space
    doc.setFontSize(14);
    doc.text("PROFESSIONAL SUMMARY", margin + leftColumnWidth + 10, y);
    y += 5;
    doc.setFontSize(12);
    const summaryText = doc.splitTextToSize(
      summary ||
        "Results-driven professional with expertise in key areas. Provides a concise overview of skills, experience, and achievements, highlighting qualifications and a proven track record of success.",
      rightColumnWidth
    );
    doc.text(summaryText, margin + leftColumnWidth + 10, y, { maxWidth: rightColumnWidth });
    y += summaryText.length * 6 + 15;

    doc.setFontSize(14);
    doc.text("WORK HISTORY", margin + leftColumnWidth + 10, y);
    y += 5;
    doc.setFontSize(12);
    const experienceText = doc.splitTextToSize(
      experience ||
        "Detail relevant work experience, including job titles, companies, dates, and responsibilities. Highlight achievements, such as leading projects or delivering measurable results.",
      rightColumnWidth
    );
    doc.text(experienceText, margin + leftColumnWidth + 10, y, { maxWidth: rightColumnWidth });

    // Save the PDF
    doc.save(`${name || "resume"}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
}