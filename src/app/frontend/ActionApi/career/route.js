// src/app/frontend/ActionApi/career/route.js
import { getAll } from "@backend/controllers/Frontend/CareerController";
import { initDB } from "@/utils/initDB";

// Use a named export for GET
export async function GET(req, res) {
  return getAll(req, res);
}


// src/app/frontend/ActionApi/career/route.js
import { applyJob } from "@backend/controllers/Frontend/CareerController";
import { handleResumeUpload } from "@backend/middleware/uploadResume";

export async function POST(req) {
  try {
     await initDB();
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    const resumeFile = formData.get("resume");
    if (resumeFile) {
      data.resume = await handleResumeUpload(resumeFile);
    }
    const newApply = await applyJob(data);

    return new Response(JSON.stringify({ success: true, apply: newApply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error submitting application:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
