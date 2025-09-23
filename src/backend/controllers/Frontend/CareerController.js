import Job from "../../models/Admin/careers/JobAdd";
import Apply from "../../models/Frontend/Apply";

/*------------------------------------------------------------
  ## Fetch all jobs
------------------------------------------------------------*/

import { Op } from "sequelize";

export async function getAll(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");      
    const recent = searchParams.get("recent");
    const location = searchParams.get("location");
    const keyword = searchParams.get("keyword");

    const query = {
      where: { status: "active" },
      order: [["createdAt", "DESC"]],
    };
    
    if (type && type !== "all") { 
      const typeMap = {
        "Full Time": "Full Time",
        "Part Time": "Part Time",
        "Freelancer": "Freelancer",
      };
      query.where.type = typeMap[type];
    }

    if (location) {
      query.where.location = location;
    }

    if (keyword) {
      query.where[Op.or] = [
        { title: { [Op.like]: `%${keyword}%` } },
        { description: { [Op.like]: `%${keyword}%` } },
        { location: { [Op.like]: `%${keyword}%` } },
        { type: { [Op.like]: `%${keyword}%` } },
        { experience: { [Op.like]: `%${keyword}%` } },
      ];
    }

    if (recent) {
      query.limit = parseInt(recent);
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

/*------------------------------------------------------------
  ## Fetch single job by ID
------------------------------------------------------------*/
export async function getJobById(id) {
  try {
    const job = await Job.findOne({
      where: { id, status: "active" },
    });

    if (!job) {
      return null;
    }

    return job;
  } catch (err) {
    console.error("Error fetching job by ID:", err);
    throw err;
  }
}