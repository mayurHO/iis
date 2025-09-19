import TeacherModel from "../../models/Admin/TeacherModel";

export async function getAll() {
  try {
    const teacher = await TeacherModel.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(teacher);
    return new Response(JSON.stringify({ success: true, teacher }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching teacher data:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
