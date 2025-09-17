import Job from "../../models/Admin/JobAdd"; 

/*------------------------------------------------------------
  ## Fetch all jobs
------------------------------------------------------------*/

export async function getAll() {
  try {
    const jobs = await Job.findAll({ order: [["createdAt", "DESC"]] });
    return new Response(JSON.stringify({ success: true, jobs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error fetching jobs:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


