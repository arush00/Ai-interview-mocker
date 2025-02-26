import pdfParse from "pdf-parse";

export async function parseResume(file) {
  const buffer = await file.arrayBuffer();
  const pdfData = await pdfParse(Buffer.from(buffer));
  return pdfData.text.toLowerCase(); // Convert text to lowercase for easy keyword matching
}
