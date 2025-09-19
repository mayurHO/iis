
import { getAll } from "../../../../backend/controllers/Frontend/Teacher_headline";
export async function GET(req, res) {
  return getAll(req, res);
}

