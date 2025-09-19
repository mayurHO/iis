// import { getAll } from "@backend/controllers/Frontend/About";

// export async function GET(req, res) {
//   return getAll(req, res);
// }
import { getAll } from "@/backend/controllers/Frontend/About";
export async function GET(req, res) {
  return getAll(req, res);
}
