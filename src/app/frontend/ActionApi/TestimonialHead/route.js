
import { getAll } from "../../../../backend/controllers/Frontend/Testmonial_headline";
export async function GET(req, res) {
  return getAll(req, res);
}

