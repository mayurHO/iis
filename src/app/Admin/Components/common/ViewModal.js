"use client";
import React from "react";

export default function ViewModal({ job, onBack, onAccept, onReject }) {
  if (!job) return null;

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Application Details</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm" onClick={onBack}>
              Back
            </button>
            {onReject && (
              <button className="btn btn-danger btn-sm" onClick={() => onReject(job)}>
                Reject
              </button>
            )}
            {onAccept && (
              <button className="btn btn-success btn-sm" onClick={() => onAccept(job)}>
                Accept
              </button>
            )}
          </div>
        </div>

        <div className="card-body">
          {Object.entries(job).map(([key, value]) => (
            <div
              key={key}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <strong>{key}:</strong>
              <span>{value?.toString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
