"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CareersBanner() {
  const fileInputRef = useRef(null);
  const router = useRouter();

  const [filters, setFilters] = useState({
    location: "",
    JobType: "",
    keyword: "",
  });

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (filters.location) query.append("location", filters.location);
    if (filters.JobType) query.append("JobType", filters.JobType);
    if (filters.keyword) query.append("keyword", filters.keyword);

    router.push(`/frontend/pages/careers/careerinner?${query.toString()}`);
  };

  return (
    <section className="careers-banner d-flex flex-column flex-md-row w-100">
      <div className="banner-image w-100">
        <Image
          className="img-banner"
          src="/images/career/banner-img.png"
          alt="Careers Banner"
          width={600}
          height={400}
          priority
        />
      </div>

      <div className="banner-content w-100">
        <h1 className="mb-4">
          Find Your Future, Elevate Your <span>Careers Today !</span>
        </h1>
        <p className="mb-4">
          learn more about our open positions and how you can contribute to our
          mission.
        </p>
        <div className="banner-filter w-100">
          <div className="dropdown-filter">
            <select
              className="filter-location w-50"
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              <option value="">All Locations</option>
              <option value="pune">Pune</option>
              <option value="mumbai">Mumbai</option>
            </select>
            <select
              className="filter-team w-50"
              onChange={(e) => setFilters({ ...filters, JobType: e.target.value })}
            >
              <option value="">Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Freelancer">Freelancer</option>
            </select>
          </div>
          <input
            type="text"
            className="filter-search"
            placeholder="Search job title or keyword"
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          />
          <button className="filter-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
