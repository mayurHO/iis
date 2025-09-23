"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { MdStar } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import "@/app/styles/frontend/careers.css";
import Apply from "@/app/frontend/components/careers/Apply";
import Button from "@/app/frontend/components/common/Button";

export default function CareerInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const jobTypeFromUrl = searchParams.get("JobType") || "";
  const keyword = searchParams.get("keyword") || "";

  const [activeTab, setActiveTab] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);

  // Auto-select tab from URL JobType
  useEffect(() => {
    if (jobTypeFromUrl) {
      setActiveTab(jobTypeFromUrl);
    }
  }, [jobTypeFromUrl]);

  const fetchJobs = async ({ queryKey }) => {
    const [_key, tab, location, keyword] = queryKey;
    let url = "/frontend/ActionApi/career?status=active";

    // Apply tab filter
    if (tab === "recent") {
      url += "&recent=5";
    } else if (tab !== "all") {
      url += `&type=${encodeURIComponent(tab)}`;
    }

    // Always apply location + keyword filter if present
    if (location) url += `&location=${encodeURIComponent(location)}`;
    if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch jobs");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", activeTab, location, keyword],
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
        <p className="subtitle text-center">
          Post a job to tell us about your project. We'll quickly match you with
          the right freelancers.
        </p>

        {/* Tabs */}
        <div className="job-tabs-container d-flex justify-content-center mb-5">
          <div className="job-tabs-row d-flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={`job-tab flex-shrink-0 ${
                  activeTab === tab.value ? "active" : ""
                }`}
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
          ) : isLoading ? (
            <p>Loading jobs...</p>
          ) : jobsData.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            jobsData.map((job) => (
              <div key={job.id} className="job-item-wrapper mb-4 ms-5 me-5">
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
                    <p className="job-experience">
                      {job.experience} +experience
                    </p>
                  </div>
                  <div className="text-center job-type-container">
                    <p className="job-type">{job.type}</p>
                    <div
                      className="job-desc"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </div>
                  <Button
                    label="Apply Now"
                    onClick={() => setSelectedJob(job)}
                  />
                </div>
                <div className="w-100 mt-2 d-flex justify-content-between align-items-center px-4">
                  <p className="job-location">
                    Job Location : <span>{job.location}</span>
                  </p>
<p className="more-info flex-shrink-0">
  <span
    className="cursor-pointer text-primary"
    onClick={() => router.push(`/frontend/pages/careers/singlejob/${job.id}`)}
  >
    More info &gt;&gt;
  </span>
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
