import JobController from "@/backend/controllers/Admin/AddJobController";
import { uploadSingleImage } from "@/backend/middleware/uploadMiddleware";

export async function PUT(req, { params }) {
  try {
    const { id } = params; // get ID from URL
    const { fields, imagePath } = await uploadSingleImage(req, "image"); // parse form and image
    const body = { ...fields, image: imagePath }; // combine fields with image path

    // Mock response object to use your controller
    const mockRes = {
      statusCode: 200,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.body = data;
        return data;
      },
    };

    // Call update method in controller
    await JobController.update({ params: { id }, body }, mockRes);

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

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const mockRes = {
      statusCode: 200,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.body = data;
        return data;
      },
    };

    await JobController.delete({ params: { id } }, mockRes);

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
