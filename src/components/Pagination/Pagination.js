import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const getVisiblePages = () => {
        const visiblePages = [];
        const rangeStart = Math.max(1, currentPage - 1); // Show 1 page before current
        const rangeEnd = Math.min(totalPages, currentPage + 1); // Show 1 page after current

        for (let i = rangeStart; i <= rangeEnd; i++) {
            visiblePages.push(i);
        }
        return visiblePages;
    };

    const visiblePages = getVisiblePages();

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="pagination-container">
            {/* Previous Button */}
            <button
                className="pagination-btn"
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page Buttons */}
            {visiblePages.map((number) => (
                <button
                    key={number}
                    className={`pagination-btn ${number === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}

            {/* Next Button */}
            <button
                className="pagination-btn"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
