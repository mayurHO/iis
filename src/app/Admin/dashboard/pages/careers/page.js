"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddJob() {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData,"formdata");
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("location", formData.location);
    formDataObj.append("type", formData.type);
    formDataObj.append("description", formData.description);
    formDataObj.append("experience", formData.experience);
    formDataObj.append("startDate", formData.startDate);
    formDataObj.append("endDate", formData.endDate);
    if (formData.image) {
      formDataObj.append("image", formData.image); // matches useState
    }

    try {
      const res = await fetch("/Admin/ActionApi/Carrier", {
        method: "POST",
        body: formDataObj, // FormData handles file upload automatically
      });

      const data = await res.json();
      if (res.ok) {
        alert("Job added successfully!");
      } else {
        alert(data.error || "Failed to add job.");
      }
    } catch (err) {
      console.log("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Add Job</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Job Title</label>
          <input type="text" className="form-control" name="title" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Job Location</label>
          <input type="text" className="form-control" name="location" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Job Type</label>
          <input type="text" className="form-control" name="type" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Experience</label>
          <input type="text" className="form-control" name="experience" onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Job Description</label>
          <textarea className="form-control" rows="3" name="description" onChange={handleChange}></textarea>
        </div>

        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input type="date" className="form-control" name="startDate" onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input type="date" className="form-control" name="endDate" onChange={handleChange} />
        </div>

        <div className="col-12">
          <label className="form-label">Job Image</label>
          <input type="file" className="form-control" name="image" onChange={handleChange} />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">Add Job</button>
        </div>
      </form>
    </div>
  );
}
