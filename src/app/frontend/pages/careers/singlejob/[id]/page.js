"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdPlace, MdWork } from "react-icons/md";
import "@/app/styles/frontend/singlecareer.css";
import Apply from "@/app/frontend/components/careers/Apply";
import Button from "@/app/frontend/components/common/Button";
import "@/app/styles/frontend/careers.css";

const JobsSingle = () => {
  const params = useParams();
  const { id } = params;

   const [selectedJob, setSelectedJob] = useState(null);

  const fetchJobById = async () => {
    const res = await fetch(`/frontend/ActionApi/career/${id}`);
    if (!res.ok) throw new Error("Failed to fetch job");
    return res.json();
  };

  const {
    data: jobData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobSingle", id],
    queryFn: fetchJobById,
    enabled: !!id,
  });

  if (isLoading) return <p>Loading job details...</p>;
  if (error) return <p>Error loading job details</p>;

  return (
    <div className="job-single-page tb-space side-space">
      <div className="">
        <section className="job-single-banner">
          <div className="job-single-banner-inner d-flex flex-column gap-md-3 gap-3 text-md-start text-center">
            <h1 className="text-uppercase mb-0">{jobData?.title}</h1>
            <Button label="Apply Now" className="" onClick={() => setSelectedJob(jobData)} />
          </div>
        </section>
      </div>

      <section className="job-details-section sidespace section-space">
        <div className="row m-0">
          <div className="col-xl-3 col-lg-4 col-md-5 mb-lg-0 mb-3">
            <div className="job-details-inner">
              <div className="d-flex flex-column gap-xl-3 gap-lg-3 gap-2">
                <div className="d-flex gap-2 align-items-center jobs-icon">
                  <MdPlace size={24} />
                  <p className="m-0">
                    {jobData?.location || "Location not specified"}
                  </p>
                </div>
                <div className="d-flex gap-2 align-items-center jobs-icon">
                  <MdWork size={24} />
                  <p className="m-0">
                    {jobData?.experience
                      ? `${jobData.experience} yrs`
                      : "Experience not specified"}
                  </p>
                </div>
                <div className="d-flex gap-2 align-items-center jobs-icon">
                  <p className="0">Type: {jobData?.type || "Not specified"}</p>
                </div>
                <div className="d-flex gap-4">
                  <Button
                    label="Apply Now"
                    onClick={() => setSelectedJob(jobData)}
                    className="w-auto mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8 col-md-7 job-desc-section">
            <h3>Job Description</h3>
            <p dangerouslySetInnerHTML={{ __html: jobData?.description }}></p>

            <div className="date-container d-flex gap-4">
              <div className="start-date d-flex gap-2">
                <h2 className="">Start Date : </h2>
                <p>{jobData?.startDate}</p>
              </div>

              <div className="start-date d-flex gap-2">
                <h2 className="">End Date : </h2>
                <p>{jobData?.endDate}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
};

export default JobsSingle;
