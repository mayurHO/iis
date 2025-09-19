import { getAll } from "@/backend/controllers/Frontend/Client";
export async function GET(req, res) {
  return getAll(req, res);
}
