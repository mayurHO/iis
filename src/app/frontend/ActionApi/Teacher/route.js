
import { getAll } from "@/backend/controllers/Frontend/Teacher";
export async function GET(req, res) {
  return getAll(req, res);
}
