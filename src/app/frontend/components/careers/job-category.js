import React from "react";
import { FaLaptopCode, FaMicrochip, FaLandmark, FaMoneyBillWave, FaBuilding, FaPhone, FaPalette, FaUserTie } from "react-icons/fa";

const categories = [
  { name: "IT & Software", icon: <FaLaptopCode size={50} /> },
  { name: "Technology", icon: <FaMicrochip size={50} /> },
  { name: "Government", icon: <FaLandmark size={50} /> },
  { name: "Accounting / Finance", icon: <FaMoneyBillWave size={50} /> },
  { name: "Construction / Facilities", icon: <FaBuilding size={50} /> },
  { name: "Tele-communications", icon: <FaPhone size={50} /> },
  { name: "Design & Multimedia", icon: <FaPalette size={50} /> },
  { name: "Human Resource", icon: <FaUserTie size={50} /> },
];

function JobCategory() {
  return (
    <div className="job-section tb-space side-space d-flex align-items-center flex-column">
      <h2 className="section-heading mb-2">Popular Jobs Category</h2>
      <span className="subtitle mb-5">
        Learn more about our open positions and how you can contribute to our mission.
      </span>

      <div className="job-category-container row m-0 d-flex justify-content-center align-items-center">
        {categories.map((cat, idx) => (
          <div key={idx} className="col-md-3 d-flex justify-content-center flex-column align-items-center">
            <div className="mb-0 category-image">{cat.icon}</div>
            <h4 className="heading mb-0 mt-3">{cat.name}</h4>
            <span className="subtitle mt-1 mb-5">learn more about</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobCategory;
