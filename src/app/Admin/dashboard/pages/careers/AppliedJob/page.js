"use client";

import { useEffect, useState } from "react";
import JobListing from "../../../../Components/common/Listingpage";

export default function AppliedJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingJob, setViewingJob] = useState(null);

  const tableHeadings = [
    { key: "id", label: "ID" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "job_title", label: "Job Title" },
    { key: "createdAt", label: "Applied On" },
  ];

  // Fetch applied jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/admin/ActionApi/Carrier/AppliedJob");
      const data = await res.json();
      if (data.success) setJobs(data.data);
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // View applied job
  const handleView = (job) => {
    setViewingJob(job);
    alert(`Viewing application of: ${job.username} for ${job.job_title}`);
  };

  // Back to listing
  const handleBack = () => {
    setViewingJob(null);
    fetchJobs();
  };

  return (
    <>
      {viewingJob ? (
        <div className="p-3 border">
          <h3>Application Details</h3>
          <p><b>Username:</b> {viewingJob.username}</p>
          <p><b>Email:</b> {viewingJob.email}</p>
          <p><b>Applied For:</b> {viewingJob.job_title}</p>
          <p><b>Applied On:</b> {new Date(viewingJob.createdAt).toLocaleString()}</p>
          <button className="btn btn-secondary mt-2" onClick={handleBack}>
            Back to Listing
          </button>
        </div>
      ) : loading ? (
        <div>Loading applied jobs...</div>
      ) : (
        <JobListing
          title="Applied Jobs"
          jobs={jobs}
          headings={tableHeadings}
          onView={handleView}
        />
      )}
    </>
  );
}
