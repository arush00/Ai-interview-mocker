"use client";

export default function ResumePreview({ data }) {
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

  const aiStyle = {
    border: `2px solid ${color}`,
    padding: "20px",
    fontFamily: "Arial, Helvetica, sans-serif",
    maxWidth: "850px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const columnStyle = {
    display: "flex",
    gap: "30px",
  };

  const columnStyleLeft = {
    flex: "1",
    padding: "10px",
  };

  const columnStyleRight = {
    flex: "2",
    padding: "10px",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
    textAlign: "center",
    borderBottom: `2px solid ${color}`,
    paddingBottom: "10px",
  };

  const subHeadingStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
    marginTop: "20px",
    marginBottom: "10px",
    textTransform: "uppercase",
  };

  const textStyle = {
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#444",
  };

  const listStyle = {
    listStyleType: "disc",
    paddingLeft: "20px",
    margin: "0",
  };

  return (
    <div style={aiStyle} className="rounded-lg">
      <div style={columnStyle}>
        <div style={columnStyleLeft}>
          <div style={subHeadingStyle}>CONTACT</div>
          <div style={textStyle}>
            {address || "Pasadena, CA 91003"}<br />
            Mobile: {phone || "9137432518"}<br />
            {email || "chaubeyarush1228@gmail.com"}
          </div>
          <div style={{ marginTop: "20px", ...subHeadingStyle }}>SKILLS</div>
          <ul style={listStyle}>
            {skills
              ?.split(",")
              .filter((skill) => skill.trim())
              .map((skill, index) => (
                <li key={index} style={textStyle}>
                  {skill.trim()}
                </li>
              ))}
          </ul>
          <div style={{ marginTop: "20px", ...subHeadingStyle }}>EDUCATION</div>
          <div style={textStyle}>{education || "Higher Secondary and Graduate School"}</div>
          <div style={{ marginTop: "20px", ...subHeadingStyle }}>CERTIFICATIONS</div>
          <div style={textStyle}>
            {certifications || "List specific certifications here (e.g., Name, Year)"}
          </div>
        </div>
        <div style={columnStyleRight}>
          <h1 style={headingStyle}>{name || "Arush Chaubey"}</h1>
          <div style={subHeadingStyle}>PROFESSIONAL SUMMARY</div>
          <div style={textStyle}>
            {summary ||
              "Results-driven professional with expertise in key areas. Provides a concise overview of skills, experience, and achievements, highlighting qualifications and a proven track record of success."}
          </div>
          <div style={{ marginTop: "20px", ...subHeadingStyle }}>WORK HISTORY</div>
          <div style={textStyle}>
            {experience ||
              "Detail relevant work experience, including job titles, companies, dates, and responsibilities. Highlight achievements, such as leading projects or delivering measurable results."}
          </div>
        </div>
      </div>
    </div>
  );
}