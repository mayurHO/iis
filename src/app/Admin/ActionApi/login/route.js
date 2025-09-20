import LoginController from "@/backend/controllers/Admin/login";

export async function POST(req) {
  try {
    const body = await req.json();

    const mockRes = {
      statusCode: 200,
      status(code) { this.statusCode = code; return this; },
      json(data) { this.body = data; return data; },
    };

    await LoginController.login({ body }, mockRes);

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
  