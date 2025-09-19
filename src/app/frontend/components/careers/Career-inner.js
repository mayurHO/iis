"use client";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdStar } from "react-icons/md";
import Apply from "./Apply";

export default function CareerInner() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null); 

  const fetchJobs = async ({ queryKey }) => {
    const [_key, tab] = queryKey;
    let url = "/frontend/ActionApi/career";

    if (tab === "recent") {
      url += "?recent=5";
    } else if (tab !== "all") {
      url += `?type=${tab}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", activeTab], 
    queryFn: fetchJobs,
    keepPreviousData: true,
  });

  const tabs = [
    { label: "All", value: "all" },
    { label: "Recent Job", value: "recent" },
    { label: "Freelancer", value: "Freelancer" },
    { label: "Full Time", value: "Full Time" },
    { label: "Part Time", value: "Part Time" },
  ];

  const jobsData = data?.jobs || [];

  return (
    <div className="career-inner tb-space">
      <div className="side-space">
        <h2 className="section-heading text-center">New & Random Jobs</h2>
        <p className="heading text-center">Post a job to tell us about your project. We'll quickly match you with the right freelancers.</p>
        {/* Tabs */}
        <div className="job-tabs-container d-flex justify-content-center mb-5">
          <div className="job-tabs-row d-flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={`job-tab ${activeTab === tab.value ? "active" : ""}`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Job List */}
        <div className="job-list">
          {error ? (
            <p>Error loading jobs</p>
          ) : (
            jobsData.map((job) => (
              <div key={job.id} className="job-item-wrapper mb-3">
                <div className="job-item d-flex justify-content-between align-items-center">
                  <div className="star-icon">
                    <MdStar />
                  </div>
                  <Image
                    src={job.image || "/images/frontend-developer.png"}
                    alt={job.title}
                    width={55}
                    height={55}
                    className="job-img"
                  />
                  <div className="text-center">
                    <h4 className="job-title">{job.title}</h4>
                    <p className="job-experience">{job.experience} experience</p>
                  </div>
                  <div className="text-center">
                    <p className="job-type">{job.type}</p>
                    <p className="job-desc">{job.description}</p>
                  </div>
                  <button
                    className="apply-btn"
                    onClick={() => setSelectedJob(job)}
                  >
                    Apply Now
                  </button>
                </div>
                <div className="w-100 mt-2 d-flex justify-content-between align-items-center px-4">
                  <p className="job-location">
                    Job Location : <span>{job.location}</span>
                  </p>
                  <p className="more-info">
                    <a
                      href={job.moreInfo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      More info &gt;&gt;{" "}
                    </a>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setSelectedJob(null)}
            >
              &times;
            </button>
            <Apply job={selectedJob} />
          </div>
        </div>
      )}
    </div>
  );
}
