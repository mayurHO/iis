import React from "react";
import "@/app/styles/admin/careers.css";

export default function JobListing({
  title,
  actionButton,
  jobs,
  headings,
  onView,
  onEdit,
  onDelete,
}) {
  // Build action columns dynamically
  const actionColumns = [
    { label: "View", handler: onView, icon: "👁️" },
    { label: "Edit", handler: onEdit, icon: "✏️" },
    { label: "Delete", handler: onDelete, icon: "🗑️" },
  ].filter((action) => typeof action.handler === "function");

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
              <th key={h.key} className="py-2">
                {h.label}
              </th>
            ))}
            {actionColumns.map((col) => (
              <th key={col.label}>{col.label}</th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id} className="text-center">
                {headings.map((h) => (
                  <td key={h.key}>{job[h.key]}</td>
                ))}

                {actionColumns.map((col) => (
                  <td key={col.label} className="action-buttons">
                    <button
                      type="button"
                      className="border-0"
                      onClick={() =>
                        col.label === "Delete"
                          ? col.handler(job.id)
                          : col.handler(job)
                      }
                    >
                      {col.icon}
                    </button>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headings.length + actionColumns.length} className="text-center py-4">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
 