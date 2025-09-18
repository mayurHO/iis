
// import EduAbout from "../../models/Admin/EduAboutDetails";

// export async function getAll() {
//   try {
//     const jobs = await EduAbout.findAll({ order: [["createdAt", "DESC"]] });
//     return new Response(JSON.stringify({ success: true, jobs }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("❌ Error fetching jobs:", err);
//     return new Response(JSON.stringify({ error: err.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
import EduAboutDetails from "../../models/Admin/EduAboutDetails";

export async function getAll() {
  try {
    const about = await EduAboutDetails.findAll({
      order: [["createdAt", "DESC"]],
    });
    console.log(about);
    return new Response(JSON.stringify({ success: true, about }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching about data:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
