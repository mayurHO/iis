import Banner from "../../models/Admin/Banner";

export async function getAll(req, res) {
  try {
    const banners = await Banner.findAll({
      order: [["createdAt", "DESC"]],
    });
    return new Response(JSON.stringify({ success: true, banners }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching banners:", err); // <-- check terminal logs
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}