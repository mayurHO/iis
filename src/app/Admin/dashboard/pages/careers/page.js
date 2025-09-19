"use client";

import { useEffect, useState } from "react";
import JobListing from "../../../Components/Listingpage";
import CareerAdd from "./CareerAdd";

export default function AddJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const tableHeadings = [
    { key: "id", label: "ID" },
    { key: "title", label: "Job Title" },
    { key: "type", label: "Job Type" },
  ];

  // Fetch jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/Admin/ActionApi/Carrier");
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

  // Edit job
  const handleEdit = (job) => {
    setEditingJob(job);
    setShowAdd(true);
  };

  // Delete job
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`/Admin/ActionApi/Carrier/${id}`, { method: "DELETE" });
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
    fetchJobs(); // refresh list after add/update
  };

  return (
    <>
      {showAdd ? (
        <CareerAdd job={editingJob} onBack={handleBack} />
      ) : loading ? (
        <div>Loading jobs...</div>
      ) : (
        <JobListing
          title="Job Listing"
          actionButton={
            <button
              className="btn btn-primary"
              onClick={() => {
                setEditingJob(null);
                setShowAdd(true);
              }}
            >
              Add Job
            </button> 
          }
          jobs={jobs}
          headings={tableHeadings}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
