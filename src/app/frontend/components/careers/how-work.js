import React from "react";
import Image from "next/image";

export default function HowWork() {
    return (
        <div className="how-work side-space  d-flex gap-5 w-100">
            <div className="process-container w-50">
                <h2 className="section-heading">How It Work</h2>
                <p className="mb-4">Post a job to tell us about your project. We'll quickly match you with the right freelancers.</p>
                <div className="process-step d-flex pb-3">
                    <p className="process-count">1</p>
                    <div className="process-data ms-3">
                        <h4 className="heading">Register an account</h4>
                        <p>Due to its widespread use as filler text for layouts, non-readability is of great importance.</p>
                    </div>
                </div>
                <div className="process-step d-flex pb-3">
                    <p className="process-count">2</p>
                    <div className="process-data ms-3">
                        <h4 className="heading">Find your job</h4>
                        <p>There are many variations of passages of avaibookmark-label, but the majority alteration in some form.</p>
                    </div>
                </div>
                <div className="d-flex">
                    <p className="process-count">3</p>
                    <div className="process-data ms-3">
                        <h4 className="heading">Apply for job</h4>
                        <p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page..</p>
                    </div>
                </div>
            </div>
            <div className="work-img-container w-50">
                <Image
                    src="/images/career/process-02.png"
                    alt="Banner Shape"
                    width={500}
                    height={400}
                />
            </div>
        </div>
    );
};
