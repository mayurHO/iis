"use client";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CareerAdd({ job, onBack }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
    experience: "",
    startDate: "",
    endDate: "",
    image: null,
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        location: job.location || "",
        type: job.type || "",
        description: job.description || "",
        experience: job.experience || "",
        startDate: job.startDate || "",
        endDate: job.endDate || "",
        image: null, 
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("location", formData.location);
    formDataObj.append("type", formData.type);
    formDataObj.append("description", formData.description);
    formDataObj.append("experience", formData.experience);
    formDataObj.append("startDate", formData.startDate);
    formDataObj.append("endDate", formData.endDate);
    if (formData.image) formDataObj.append("image", formData.image);

    // Determine URL and method based on whether editing or adding
    const url = job && job.id ? `/Admin/ActionApi/Carrier/${job.id}` : "/Admin/ActionApi/Carrier";
    const method = job && job.id ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formDataObj });
      const data = await res.json();
      if (res.ok) {
        alert(job ? "Job updated successfully!" : "Job added successfully!");
        onBack(); // Go back to listing page after success
      } else {
        alert(data.error || "Failed to save job.");
      }
    } catch (err) {
      console.log("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="container">
      <div className="mb-3 d-flex justify-content-between align-items-center"> 
      <h2 className="mb-4">{job ? "Edit Job" : "Add Job"}</h2>
      <button type="button" className="btn btn-secondary" onClick={onBack}>Back</button>
      </div>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Job Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Job Type</label>
          <input
            type="text"
            className="form-control"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Experience</label>
          <input
            type="text"
            className="form-control"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Job Description</label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Job Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleChange}
          />
        </div>
          <button type="submit" className="btn btn-primary w-auto mx-auto">{job ? "Update Job" : "Add Job"}</button>
      </form>
    </div>
  );
}
