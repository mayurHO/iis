// src/app/frontend/ActionApi/career/route.js
import { getAll } from "@backend/controllers/Frontend/CareerController";

// Use a named export for GET
export async function GET(req, res) {
  return getAll(req, res);
}
