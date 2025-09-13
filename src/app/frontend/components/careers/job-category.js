import React from "react";
import Image from "next/image";

const JobCategory = ({ categories, onSelectCategory }) => {
  return (
    <div className="side-space">
      <h2 className="section-heading">Popular Jobs Category</h2>
      <span>
        learn more about our open positions and how you can contribute to our
        mission.
      </span>
      <div className="job-category-container row m-0 d-flex justify-content-center align-items-center">
        <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <Image
            src="/images/career/upload-img.png"
            alt="Banner Shape"
            width={100}
            height={70}
          />
          <p>IT & Software</p>
          <span>learn more about</span>
        </div>
        <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <Image
            src="/images/career/upload-img.png"
            alt="Banner Shape"
            width={100}
            height={70}
          />
          <p>IT & Software</p>
          <span>learn more about</span>
        </div>
        <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <Image
            src="/images/career/upload-img.png"
            alt="Banner Shape"
            width={100}
            height={70}
          />
          <p>IT & Software</p>
          <span>learn more about</span>
        </div>
        <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <Image
            src="/images/career/upload-img.png"
            alt="Banner Shape"
            width={100}
            height={70}
          />
          <p>IT & Software</p>
          <span>learn more about</span>
        </div>
         <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <Image
            src="/images/career/upload-img.png"
            alt="Banner Shape"
            width={100}
            height={70}
          />
          <p>IT & Software</p>
          <span>learn more about</span>
        </div>
         <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <Image
            src="/images/career/upload-img.png"
            alt="Banner Shape"
            width={100}
            height={70}
          />
          <p>IT & Software</p>
          <span>learn more about</span>
        </div>
         <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <Image
            src="/images/career/upload-img.png"
            alt="Banner Shape"
            width={100}
            height={70}
          />
          <p>IT & Software</p>
          <span>learn more about</span>
        </div>
         <div className="col-md-3 d-flex justify-content-center flex-column align-items-center">
          <Image
            src="/images/career/upload-img.png"
            alt="Banner Shape"
            width={100}
            height={70}
          />
          <p>IT & Software</p>
          <span>learn more about</span>
        </div>
      </div>
    </div>
  );
};

export default JobCategory;
