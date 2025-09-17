"use client"; 
import Image from "next/image";
import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchJobs = async () => {
  const res = await fetch("/frontend/ActionApi/career");
  const data = await res.json();
  console.log("Fetched jobs:", data);
  if (!data.success) throw new Error("Failed to fetch jobs");
  return data.jobs;
};

const CareerInner = () => {
  const { data: jobs = [], isLoading, isError } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  if (isLoading) return <p>Loading jobs...</p>;
  if (isError) return <p>Error loading jobs.</p>;

  return (
    <div className="career-inner tb-space">
      <div className="side-space">
        <h2 className="section-heading text-center">New & Random Jobs</h2>
        <p className="mb-4 text-center">
          Post a job to tell us about your project. We'll quickly match you with the right freelancers.
        </p>

        <div className="job-tabs-container d-flex justify-content-center mb-5">
          <div className="job-tabs-row d-flex gap-5">
            <button className="job-tab active">ALL</button>
            <button className="job-tab">Recent Job</button>
            <button className="job-tab">Freelancer</button>
            <button className="job-tab">Part Time</button>
            <button className="job-tab">Full Time</button>
          </div>
        </div>

        <div className="job-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-item d-flex justify-content-between align-items-center">
              <Image src={job.image || "/images/frontend-developer.png"} alt={job.title} width={80}   height={80}  className="job-img"/>

              <div className="text-center">
                <h4 className="job-title">{job.title}</h4>
                <p className="job-experience">{job.experience}+ years experience</p>
              </div>
              <div className="text-center">
                <p className="job-type">{job.type}</p>
                <p className="job-desc">{job.description}</p>
              </div>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerInner;
