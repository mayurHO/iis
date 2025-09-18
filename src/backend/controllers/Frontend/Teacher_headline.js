import TeacherHeadline from "../../models/Admin/TeacherHeadline";

export async function getAll() {
  try {
    const teacher_head = await TeacherHeadline.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(teacher_head,"teacher");
    return new Response(JSON.stringify({ success: true, teacher_head}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching teacher_heading data:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
