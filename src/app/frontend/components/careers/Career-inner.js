import React from 'react';

const CareerInner = () => {
    return (
        <div className="career-inner tb-space">
            <div className="side-space">
                <h2 className="section-heading text-center">New & Random Jobs</h2>
                <p className="mb-4 text-center">Post a job to tell us about your project. We'll quickly match you with the right freelancers.</p>
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
                    <div className="job-item d-flex justify-content-between align-items-center">
                        <img src="/images/frontend-developer.png" alt="Frontend Developer" className="job-img" />
                        <div className='text-center'>
                            <h4 className="job-title">Frontend Developer</h4>
                            <p className="job-experience">2+ years experience</p>
                        </div>
                        <div className='text-center'>
                            <p className="job-type">Full Time</p>
                            <p className="job-desc">Work on React-based web applications for a fast-growing startup.</p>
                        </div>
                        <button className="apply-btn">Apply Now</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CareerInner;