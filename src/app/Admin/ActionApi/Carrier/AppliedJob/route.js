import { getAppliedJob } from "@backend/controllers/Admin/AddJobController";

export async function GET(req) {
  return getAppliedJob(req);
}
