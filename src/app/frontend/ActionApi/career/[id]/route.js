import { NextResponse } from "next/server";
import { getJobById } from "@/backend/controllers/Frontend/CareerController";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const job = await getJobById(id);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (err) {
    console.error("Error fetching job:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
