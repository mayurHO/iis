import ClientModel from "../../models/Admin/ClientModel";

export async function getAll() {
  try {
    const client = await ClientModel.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(client);
    return new Response(JSON.stringify({ success: true, client }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching client data:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
