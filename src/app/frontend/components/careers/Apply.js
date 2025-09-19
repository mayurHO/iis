"use client";
import { useState, useEffect } from "react";

export default function Apply({ job }) {
  const [experienceType, setExperienceType] = useState("fresher");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Set job title when job changes
  useEffect(() => {
    if (job?.title) {
      setPosition(job.title);
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const formData = new FormData(e.target);
    formData.set("experienceType", experienceType); // ensure radio value is included
    formData.set("position", position); // ensure position is included

    try {
      const res = await fetch("/frontend/ActionApi/career", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application");
      }

      setSuccessMsg("Application submitted successfully!");
      e.target.reset();
      setExperienceType("fresher"); // reset to default
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-form-container p-4 pt-0">
      <h2 className="mb-3">Apply Now</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name*</label>
          <input type="text" name="name" className="form-control" required />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email*</label>
          <input type="email" name="email" className="form-control" required />
        </div>

        {/* Position Apply */}
        <div className="mb-3">
          <label className="form-label">Position Apply*</label>
          <input
            type="text"
            name="position"
            className="form-control"
            value={position}
            readOnly
          />
        </div>

        {/* Contact Number */}
        <div className="mb-3">
          <label className="form-label">Contact Number*</label>
          <input type="tel" name="number" className="form-control" required />
        </div>

        {/* Radio buttons */}
        <div className="mb-3">
          <label className="form-label">You are</label>
          <div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="fresher"
                name="experienceType"
                value="fresher"
                className="form-check-input"
                checked={experienceType === "fresher"}
                onChange={() => setExperienceType("fresher")}
              />
              <label htmlFor="fresher" className="form-check-label">
                Fresher
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                id="experience"
                name="experienceType"
                value="experience"
                className="form-check-input"
                checked={experienceType === "experience"}
                onChange={() => setExperienceType("experience")}
              />
              <label htmlFor="experience" className="form-check-label">
                Experience
              </label>
            </div>
          </div>
        </div>

        {/* Extra fields for experience */}
        {experienceType === "experience" && (
          <>
            <div className="mb-3">
              <label className="form-label">Last Employer8</label>
              <input type="text" name="lastEmployer" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Years of Experience8</label>
              <input
                type="number"
                name="experienceYears"
                className="form-control"
                min="0"
              />
            </div>
          </>
        )}

        {/* Resume upload */}
        <div className="mb-3">
          <label className="form-label">Upload Resume</label>
          <input type="file" name="resume" className="form-control" required />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        {/* Success/Error messages */}
        {successMsg && <p className="text-success mt-2">{successMsg}</p>}
        {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}
      </form>
    </div>
  );
}
