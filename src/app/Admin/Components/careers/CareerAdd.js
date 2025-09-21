"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import "@/app/styles/admin/careers.css";

export default function CareerAdd({ job, onBack }) {
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    title: "",
    location: "",
    type: "",
    description: "",
    experience: "",
    startDate: "",
    endDate: "",
    image: null,
    status: "pending",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Job title is required"),
    location: Yup.string().required("Location is required"),
    type: Yup.string().required("Job type is required"),
    description: Yup.string().required("Description is required"),
    experience: Yup.string().required("Experience is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date cannot be before start date")
      .required("End date is required"),
  });

  const handleSubmit = async (values) => {
    const formDataObj = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "image" && values[key]) {
        formDataObj.append(key, values[key]);
      } else {
        formDataObj.append(key, values[key]);
      }
    });

    const url = job && job.id
      ? `/admin/ActionApi/Carrier/${job.id}`
      : "/admin/ActionApi/Carrier/careers";
    const method = job && job.id ? "PUT" : "POST";

    try {
      const res = await fetch(url, { method, body: formDataObj });
      const data = await res.json();

      if (res.ok) {
        toast.success(job ? "Job updated successfully!" : "Job added successfully!");
        onBack();
      } else {
        toast.error(data.error || "Failed to save job.");
      }
    } catch (err) {
      toast.error("Something went wrong: " + err.message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Set initial values if editing
  useEffect(() => {
    if (job) {
      formik.setValues({
        title: job.title || "",
        location: job.location || "",
        type: job.type || "",
        description: job.description || "",
        experience: job.experience || "",
        startDate: job.startDate || "",
        endDate: job.endDate || "",
        image: null,
        status: job.status || "pending",
      });
      if (job.image) setPreviewImage(job.image); // Use URL if available
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job]);

  // Preview uploaded image
  useEffect(() => {
    if (formik.values.image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(formik.values.image);
    }
  }, [formik.values.image]);

  return (
    <div className="container">
      <Toaster position="top-right" />
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2 className="mb-4 Listing-heading">
          {job ? "Edit Existing Job" : "Add New Job"}
        </h2>
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          Back
        </button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex gap-5">
          {/* Left column: Form */}
          <div className="form-card flex-grow-1 row g-3">
            {["title*", "location*", "type*", "experience*"].map((field) => (
              <div key={field} className="col-md-6">
                <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  className="form-control"
                  name={field}
                  value={formik.values[field] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched[field] && formik.errors[field] && (
                  <div className="text-danger">{formik.errors[field]}</div>
                )}
              </div>
            ))}

            <div className="col-12">
              <label className="form-label">Job Description*</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={formik.values.description || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.description && formik.errors.description && (
                <div className="text-danger">{formik.errors.description}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Start Date*</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={formik.values.startDate || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <div className="text-danger">{formik.errors.startDate}</div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">End Date*</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={formik.values.endDate || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <div className="text-danger">{formik.errors.endDate}</div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Job Image*</label>
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-2"
                  style={{ maxWidth: "200px", maxHeight: "200px", borderRadius: "8px" }}
                />
              )}
            </div>

            {/* Left column submit button */}
            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-primary w-auto mx-auto">
                {job ? "Update Job" : "Add Job"}
              </button>
            </div>
          </div>

          {/* Right column: Status + Submit */}
          <div className="button-container flex-shrink-0">
            <div className="col-md-12 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
              </select>
            </div>

            {/* Right column submit button */}
            <button type="submit" className="btn btn-primary w-auto mt-3">
              {job ? "Update Job" : "Add Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
