import TestimonialsHead from "../../models/Admin/TestmonialHead";

export async function getAll() {
  try {
    const test_head = await TestimonialsHead.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(test_head,"teacher");
    return new Response(JSON.stringify({ success: true, test_head}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching test_heading data:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
