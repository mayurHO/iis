import { getAll } from "@/backend/controllers/Frontend/Counter";
export async function GET(req, res) {
  return getAll(req, res);
}
