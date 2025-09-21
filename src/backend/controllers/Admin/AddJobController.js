import Job from "../../models/Admin/careers/JobAdd";
import Apply from "../../models/Frontend/Apply";

class AddJobController {
  // ADD
  async add(req, res) {
    try {
      const { title, location, type, description, experience, startDate, endDate, image, status } = req.body;
      const job = await Job.create({
        title,
        location,
        type,
        description,
        experience,
        startDate,
        endDate,
        image: image || null,
        status: status || "pending", // default to pending if not provided
      });
      return res.status(201).json({ success: true, job });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const { id } = req.params; // get id from URL
      const job = await Job.findByPk(id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      const { title, location, type, description, experience, startDate, endDate, image, status } = req.body;
      await job.update({
        title,
        location,
        type,
        description,
        experience,
        startDate,
        endDate,
        image: image || job.image, // keep old image if none uploaded
        status: status || job.status, // keep old status if not provided
      });

      return res.status(200).json({ success: true, job });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      const { id } = req.params;
      const job = await Job.findByPk(id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      await job.destroy();
      return res.status(200).json({ success: true, message: "Job deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

export default new AddJobController();


/*------------------------------------------------------------
  ## Fetch all jobs
------------------------------------------------------------*/
export async function getAll(req) {
  try {
    const jobs = await Job.findAll({
      order: [["createdAt", "DESC"]],
    });

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
  ## Fetch all Applied Job
------------------------------------------------------------*/

export async function getAppliedJob() {
  try {
    const appliedJobs = await Apply.findAll({
      order: [["createdAt", "DESC"]],
    });
    return appliedJobs;
  } catch (err) {
    console.error("Error fetching applied jobs:", err);
    throw new Error(err.message);
  }
}