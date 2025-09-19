import TestiModel from "../../models/Admin/TestiModel";

export async function getAll() {
  try {
    const testimonial = await TestiModel.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(testimonial);
    return new Response(JSON.stringify({ success: true, testimonial}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching testimonial data:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
