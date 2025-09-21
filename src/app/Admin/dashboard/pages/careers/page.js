"use client";

import { useEffect, useState } from "react";
import JobListing from "../../../Components/common/Listingpage";
import CareerAdd from "../../../Components/careers/CareerAdd";


export default function AddJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const tableHeadings = [
    { key: "id", label: "ID" },
    { key: "title", label: "Job Title" },
    { key: "type", label: "Job Type" },
    { key: "description", label: "Description" },
  ];

  // Fetch jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/ActionApi/Carrier/careers");
      const data = await res.json();
      if (data.success) setJobs(data.jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // View job
  const handleView = (job) => {
    alert(`Viewing job: ${job.title}`);
  };

  // Edit job
  const handleEdit = (job) => {
    setEditingJob(job);
    setShowAdd(true);
  };

  // Delete job
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`/admin/ActionApi/Carrier/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Job deleted successfully!");
        fetchJobs();
      } else {
        alert(data.error || "Failed to delete job.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong.");
    }
  };

  // Back to listing
  const handleBack = () => {
    setShowAdd(false);
    setEditingJob(null);
    fetchJobs(); 

  };

  return (
    <>
      {showAdd ? (
        <CareerAdd job={editingJob} onBack={handleBack} />
      ) : loading ? (
        <div>Loading jobs...</div>
      ) : (
        <JobListing
          title="All Job Data"
          actionButton={
            <button
              className="btn btn-warning flex-shrink-0"
              onClick={() => {
                setEditingJob(null);
                setShowAdd(true);
              }}
            >
              Add Job +
            </button>
          }
          jobs={jobs}
          headings={tableHeadings}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
