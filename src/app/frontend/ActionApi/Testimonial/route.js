
import { getAll } from "../../../../backend/controllers/Frontend/TestiController";
export async function GET(req, res) {
  return getAll(req, res);
}
