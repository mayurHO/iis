import Job from "../../models/Admin/JobAdd.js";

class AddJobController {
  async add(req, res) {
    try {
      const { title, location, type, description, experience, startDate, endDate, image } = req.body;

      console.log("job");
      const job = await Job.create({
        title,
        location,
        type,
        description,
        experience,
        startDate,
        endDate,
        image: req.body.image || null,
      });
      return res.status(201).json({ success: true, job });
    } catch (err) {
      return res.status(500).json({ error: "err.message" });
    }
  }
}

export default new AddJobController();
