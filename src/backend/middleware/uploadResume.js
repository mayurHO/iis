// @backend/middleware/uploadResume.js
import fs from "fs";
import path from "path";

export async function handleResumeUpload(resumeFile) {
  if (!resumeFile || resumeFile.size === 0) return null;

  const arrayBuffer = await resumeFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Ensure resume folder exists
  const uploadDir = path.join(process.cwd(), "public", "uploads", "resume");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Save file
  const fileName = `${Date.now()}-${resumeFile.name}`;
  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, buffer);

  // Return relative path for DB
  return `/upload/resume/${fileName}`;
}
