"use client";
import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import ReactPaginate from "react-paginate";
import { confirmToast, successToast } from "@/utils/Toast"; // import your toast utilities

// Utility to remove HTML tags for search only
const stripHtml = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export default function JobListing({
  title,
  actionButton,
  jobs,
  headings,
  onView,
  onEdit,
  onDelete,
  itemsPerPage = 10,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedJobs, setSelectedJobs] = useState([]);

  const actions = [
    { label: "View", handler: onView, icon: "👁️" },
    { label: "Edit", handler: onEdit, icon: "✏️" },
    { label: "Delete", handler: onDelete, icon: "🗑️" },
  ].filter((action) => typeof action.handler === "function");

  const jobsPlainText = useMemo(() => {
    return jobs.map((job) => {
      const newJob = {};
      headings.forEach((h) => {
        newJob[h.key] = stripHtml(job[h.key] || "");
      });
      newJob.id = job.id;
      return newJob;
    });
  }, [jobs, headings]);

  const fuse = useMemo(() => {
    return new Fuse(jobsPlainText, {
      keys: headings.map((h) => h.key),
      threshold: 0.3,
    });
  }, [jobsPlainText, headings]);

  const filteredJobs = useMemo(() => {
    if (!searchQuery) return jobsPlainText;
    return fuse.search(searchQuery).map((result) => result.item);
  }, [jobsPlainText, fuse, searchQuery]);

  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentItems = filteredJobs.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
  };

  const toggleJobSelection = (id) => {
    setSelectedJobs((prev) =>
      prev.includes(id) ? prev.filter((j) => j !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentIds = currentItems.map((j) => j.id);
    const allSelected = currentIds.every((id) => selectedJobs.includes(id));
    setSelectedJobs((prev) =>
      allSelected ? prev.filter((id) => !currentIds.includes(id)) : [...prev, ...currentIds]
    );
  };

  // -----------------------------
  // Delete handler with confirmation
  // -----------------------------
  const handleDelete = (id) => {
    confirmToast({
      message: "Are you sure you want to delete this job?",
      onConfirm: async () => {
        try {
          await onDelete(id); 
          successToast("Job deleted successfully!");
        } catch (err) {
          console.error(err);
        }
      },
      onCancel: () => {
        console.log("Delete cancelled");
      },
    });
  };

  return (
    <div className="listing-main">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="Listing-heading m-0">{title}</h2>
        <div className="d-flex gap-3 w-auto align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {actionButton && actionButton}
        </div>
      </div>

      <table className="w-100 border">
        <thead>
          <tr className="heading-row text-left">
            <th className="py-2 text-center">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={currentItems.every((job) => selectedJobs.includes(job.id))}
              />
            </th>
            {headings.map((h) => (
              <th key={h.key} className="py-2">{h.label}</th>
            ))}
            {actions.length > 0 && <th>Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {currentItems.length > 0 ? (
            currentItems.map((plainJob) => {
              const job = jobs.find((j) => j.id === plainJob.id);

              return (
                <tr key={job.id} className="text-left border-bottom">
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => toggleJobSelection(job.id)}
                    />
                  </td>

                  {headings.map((h) => (
                    <td key={h.key} className="ellipsis">
                      {new DOMParser().parseFromString(job[h.key], "text/html").body.textContent}
                    </td>
                  ))}

                  {actions.length > 0 && (
                    <td className="action-buttons d-flex justify-content-start gap-2">
                      {actions.map((action) => (
                        <button
                          key={action.label}
                          type="button"
                          className="border-0"
                          onClick={() =>
                            action.label === "Delete"
                              ? handleDelete(job.id)
                              : action.handler(job)
                          }
                        >
                          {action.icon}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={headings.length + 1 + (actions.length > 0 ? 1 : 0)}
                className="text-center py-4"
              >
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-end mt-3 gap-2"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
}
