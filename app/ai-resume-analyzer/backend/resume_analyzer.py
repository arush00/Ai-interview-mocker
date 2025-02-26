from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import PyPDF2
import docx
import io
import re

app = FastAPI()

class ResumeAnalysis(BaseModel):
    feedback: str
    atsScore: int
    suggestions: list[str]
    youtubeLinks: list[str]

def extract_text(file: UploadFile):
    file_data = io.BytesIO(file.file.read())  # Read file in binary mode
    text = ""

    if file.filename.endswith(".pdf"):
        pdf_reader = PyPDF2.PdfReader(file_data)
        text = " ".join(page.extract_text() for page in pdf_reader.pages if page.extract_text())
    elif file.filename.endswith(".docx"):
        doc = docx.Document(file_data)
        text = " ".join([paragraph.text for paragraph in doc.paragraphs])
    else:
        raise ValueError("Unsupported file format. Please upload PDF or DOCX.")

    return text.strip()

def analyze_resume(text: str) -> ResumeAnalysis:
    keywords = ["skills", "experience", "education", "certifications"]
    ats_score = 0
    feedback = "Your resume is well-structured but could be improved."
    suggestions = []
    youtube_links = []

    for keyword in keywords:
        if re.search(rf"\b{keyword}\b", text.lower()):
            ats_score += 25
    ats_score = min(100, ats_score)  

    if "skills" not in text.lower():
        suggestions.append("Add a 'Skills' section with relevant technical and soft skills.")
    if "experience" not in text.lower():
        suggestions.append("Include a 'Work History' or 'Experience' section with detailed job roles and achievements.")
    if ats_score < 80:
        suggestions.append("Optimize your resume for ATS by including more keywords from the job description.")

    youtube_links = [
        "https://www.youtube.com/watch?v=example1",
        "https://www.youtube.com/watch?v=example2",
    ]

    return ResumeAnalysis(
        feedback=feedback,
        atsScore=ats_score,
        suggestions=suggestions,
        youtubeLinks=youtube_links
    )

@app.post("/analyze")
async def analyze_resume_endpoint(file: UploadFile = File(...)):
    text = extract_text(file)
    analysis = analyze_resume(text)
    return analysis.dict()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
