import { initDB } from "@/utils/initDB";
import JobController from "@/backend/controllers/Admin/AddJobController";
import { uploadSingleImage } from "@/backend/middleware/uploadMiddleware";

export async function POST(req) {
  try {
    await initDB();

    const { fields, imagePath } = await uploadSingleImage(req, "image");
    const body = { ...fields, image: imagePath };

    const mockRes = {
      statusCode: 200,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.body = data; return data; },
    };

    await JobController.add({ body }, mockRes);

    return new Response(JSON.stringify(mockRes.body), {
      status: mockRes.statusCode,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
