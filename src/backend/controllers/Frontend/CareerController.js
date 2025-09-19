import Job from "../../models/Admin/JobAdd"; 
import Apply from "../../models/Frontend/Apply";

/*------------------------------------------------------------
  ## Fetch all jobs
------------------------------------------------------------*/

export async function getAll(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");      
    const recent = searchParams.get("recent"); 

    const query = {};
    
    if (type && type !== "all") {
      const typeMap = {
        "Full Time": "Full Time",
        "Part Time": "Part Time",
        "Freelancer": "Freelancer",
      };
      query.where = { type: typeMap[type] };
    }

    if (recent) {
      query.limit = parseInt(recent);
      query.order = [["createdAt", "DESC"]];
    } else {
      query.order = [["createdAt", "DESC"]];
    }

    const jobs = await Job.findAll(query);

    return new Response(JSON.stringify({ success: true, jobs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


/*------------------------------------------------------------
  ## APPly For job
------------------------------------------------------------*/


export async function applyJob(data) {
  const newApply = await Apply.create({
    name: data.name,
    email: data.email,
    position: data.position,
    number: data.number,
    experienceType: data.experienceType,
    lastEmployer: data.lastEmployer || null,
    experienceYears: data.experienceYears || null,
    resume: data.resume,
  });
  return newApply;
}
