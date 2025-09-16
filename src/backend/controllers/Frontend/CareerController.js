import Career from "@/models/Career"; // Adjust the path to your model

// Get all careers
export async function getAllCareers(req, res) {
  try {
    const careers = await Career.find(); // or your ORM's method
    return res.status(200).json({ success: true, data: careers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Failed to fetch careers." });
  }
}

// Get a single career by ID
export async function getCareerById(req, res) {
  try {
    const { id } = req.params;
    const career = await Career.findById(id); // or your ORM's method
    if (!career) {
      return res.status(404).json({ success: false, error: "Career not found." });
    }
    return res.status(200).json({ success: true, data: career });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Failed to fetch career." });
  }
}