"use client";

import React, { useState, useEffect } from "react";
import JobListing from "../../../../Components/common/Listingpage";
import CareerAdd from "../../../../Components/careers/CareerAdd";
import ViewJob from "../../../../Components/common/ViewModal"; 
import "@/app/styles/admin/careers.css";
import { errorToast } from "@/utils/Toast";

export default function AddJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [viewJob, setViewJob] = useState(null); 

  const tableHeadings = [
    { key: "id", label: "ID" },
    { key: "title", label: "Job Title" },
    { key: "type", label: "Job Type" },
    { key: "description", label: "Description" },
  ];

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/Admin/ActionApi/Carrier/careers");
      const data = await res.json();
      if (data.success) setJobs(data.jobs);
    } catch (err) {
      console.error(err);
      errorToast("Error fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleView = (job) => setViewJob(job); // show view component
  const handleEdit = (job) => {
    setEditingJob(job);
    setShowAdd(true);
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/Admin/ActionApi/Carrier/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) errorToast(data.error || "Failed to delete job.");
      else fetchJobs();
    } catch (err) {
      console.error(err);
      errorToast("Something went wrong while deleting job.");
    }
  };
  const handleBackFromView = () => setViewJob(null); // go back to listing
  const handleBackFromAdd = () => {
    setShowAdd(false);
    setEditingJob(null);
    fetchJobs();
  };

  return (
    <>
      {showAdd ? (
        <CareerAdd job={editingJob} onBack={handleBackFromAdd} />
      ) : viewJob ? (
        <ViewJob job={viewJob} onBack={handleBackFromView} />
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
