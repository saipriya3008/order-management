import React from 'react';

const PaginationControls = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <button className="btn btn-outline-primary" disabled={page === 0} onClick={() => onPageChange(page - 1)}>Previous</button>
      <span>Page {page + 1} of {totalPages}</span>
      <button className="btn btn-outline-primary" disabled={page + 1 >= totalPages} onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  );
};

export default PaginationControls;
