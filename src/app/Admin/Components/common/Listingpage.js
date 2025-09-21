"use client";
import React, { useState, useMemo } from "react";
import Fuse from "fuse.js";
import ReactPaginate from "react-paginate";

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

  const actions = [
    { label: "View", handler: onView, icon: "👁️" },
    { label: "Edit", handler: onEdit, icon: "✏️" },
    { label: "Delete", handler: onDelete, icon: "🗑️" },
  ].filter(action => typeof action.handler === "function");

  const fuse = useMemo(() => {
    return new Fuse(jobs, {
      keys: headings.map(h => h.key),
      threshold: 0.3,
    });
  }, [jobs, headings]);

  const filteredJobs = useMemo(() => {
    if (!searchQuery) return jobs;
    return fuse.search(searchQuery).map(result => result.item);
  }, [jobs, fuse, searchQuery]);

  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);
  const currentItems = filteredJobs.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handlePageClick = (selected) => {
    setCurrentPage(selected.selected);
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

      <table className="w-100">
        <thead>
          <tr className="heading-row text-center">
            {headings.map(h => <th key={h.key} className="py-2">{h.label}</th>)}
            {actions.length > 0 && <th>Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y">
          {currentItems && currentItems.length > 0 ? (
            currentItems.map(job => (
              <tr key={job.id} className="text-center">
                {headings.map(h => <td key={h.key}>{job[h.key]}</td>)}
                {actions.length > 0 && (
                  <td className="action-buttons d-flex justify-content-center gap-2">
                    {actions.map(action => (
                      <button
                        key={action.label}
                        type="button"
                        className="border-0"
                        onClick={() =>
                          action.label === "Delete"
                            ? action.handler(job.id)
                            : action.handler(job)
                        }
                      >
                        {action.icon}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headings.length + (actions.length > 0 ? 1 : 0)} className="text-center py-4">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-end mt-3"}
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
