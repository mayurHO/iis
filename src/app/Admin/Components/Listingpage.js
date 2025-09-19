import React from "react";
import "@/app/styles/admin/careers.css";

export default function JobListing({
  title,
  actionButton, 
  jobs,
  headings,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{title}</h2>
        {actionButton && actionButton}
      </div>

      <table className="w-100 border border-gray-300">
        <thead>
          <tr className="heading-row text-center">
            {headings.map((h) => (
              <th key={h.key} className="py-2">{h.label}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id} className="text-center">
                {headings.map((h) => (
                  <td key={h.key}>{job[h.key]}</td>
                ))}

                <td className="action-buttons">
                  <button type="button" className="border-0" onClick={() => onEdit(job)}>
                    ✏️
                  </button>
                </td>

                <td className="action-buttons">
                  <button type="button" className="border-0" onClick={() => onDelete(job.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headings.length + 2} className="text-center py-4">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
