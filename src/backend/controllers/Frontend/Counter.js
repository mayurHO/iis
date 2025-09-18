import CounterModel from "../../models/Admin/CounterModel";

export async function getAll() {
  try {
    const counter = await CounterModel.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(counter);
    return new Response(JSON.stringify({ success: true, counter }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching counter data:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
