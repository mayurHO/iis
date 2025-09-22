"use client";

import { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdArrowBack } from "react-icons/md";
import TestEditor from "@/app/Admin/Components/common/TestEditor";
import { successToast, errorToast,confirmToast} from "@/utils/Toast";
export default function CareerAdd({ job, onBack }) {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formDataObj = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "image" && values[key]) {
          formDataObj.append(key, values[key]);
        } else {
          formDataObj.append(key, values[key]);
        }
      });

      const url =
        job && job.id
          ? `/Admin/ActionApi/Carrier/${job.id}`
          : "/Admin/ActionApi/Carrier/careers";
      const method = job && job.id ? "PUT" : "POST";

      try {
        const res = await fetch(url, { method, body: formDataObj });
        const data = await res.json();

        if (res.ok) {
          successToast(
            job ? "Job updated successfully!" : "Job added successfully!"
          );
          onBack();
        } else {
          errorToast(data.error || "Failed to save job.");
        }
      } catch (err) {
        errorToast("Something went wrong: " + err.message);
      }
    },
  });

  // Set initial form values and old image
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
        image: null, // keep as null for old image
        status: job.status || "pending",
      });
      if (job.image) setPreviewImage(job.image); // show old image path
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job]);

  // Preview newly selected file only if it's a File object
  useEffect(() => {
    if (formik.values.image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(formik.values.image);
    }
  }, [formik.values.image]);

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;
    formik.setFieldValue("image", file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setPreviewImage(null);
    formik.setFieldValue("image", null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <div className="container">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2 className="mb-0 Listing-heading">
          <button type="button" className="btn" onClick={onBack}>
            <MdArrowBack size={25} className="me-2" />
          </button>
          {job ? "Edit Existing Job" : "Add New Job"}
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex gap-5">
          <div className="form-card flex-grow-1 row g-3">
            {["title", "location", "type", "experience"].map((field) => (
              <div key={field} className="col-md-6">
                <label className="form-label">
                  {field.charAt(0).toUpperCase() + field.slice(1)}*
                </label>
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
              <TestEditor
                value={formik.values.description}
                onChange={(content) =>
                  formik.setFieldValue("description", content)
                }
                placeholder="Enter job description..."
              />
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
              <div
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="d-flex justify-content-center align-items-center position-relative job-image"
              >
                {!previewImage && (
                  <span className="text-muted text-center">
                    Drag & Drop or Click
                  </span>
                )}

                {previewImage && (
                  <>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-100 h-100 rounded object-fit-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="position-absolute top-0 end-0 bg-danger text-white border-0 rounded-circle"
                    >
                      ×
                    </button>
                  </>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>
            </div>

            <div className="col-12 d-flex justify-content-center">
              <button type="submit" className="btn btn-warning w-auto mx-auto">
                {job ? "Update Job" : "Add Job"}
              </button>
            </div>
          </div>

          <div className="button-container flex-shrink-0 d-flex flex-column justify-content-center mt-4">
            <div className="col-md-12 mb-3">
              <label className="form-label text-white">Status</label>
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
            <button type="submit" className="btn btn-warning w-auto">
              {job ? "Update Job" : "Add Job"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
