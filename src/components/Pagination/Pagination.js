// Pagination.js
import React from 'react';

function Pagination({ currentPage, totalPages, paginate }) {
    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3; // Pages to show around the current page

        if (totalPages <= maxVisiblePages + 4) {
            // Display all pages if there are fewer pages than the threshold
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Display first, last, and nearby pages with ellipses
            if (currentPage > 1) pageNumbers.push(1);
            if (currentPage > 3) pageNumbers.push('...');
            
            for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
                pageNumbers.push(i);
            }
            
            if (currentPage < totalPages - 2) pageNumbers.push('...');
            if (currentPage < totalPages) pageNumbers.push(totalPages);
        }
        return pageNumbers;
    };

    return (
        <nav className="pagination">
            <ul className="pagination-list">
                {/* Previous Button */}
                <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        className="pagination-button"
                        disabled={currentPage === 1}
                    >
                        &lt;
                    </button>
                </li>

                {/* Page Numbers */}
                {generatePageNumbers().map((number, index) => (
                    <li
                        key={index}
                        className={`pagination-item ${
                            currentPage === number ? 'active' : ''
                        } ${number === '...' ? 'ellipsis' : ''}`}
                    >
                        {number === '...' ? (
                            <span className="pagination-ellipsis">...</span>
                        ) : (
                            <button onClick={() => paginate(number)} className="pagination-button">
                                {number}
                            </button>
                        )}
                    </li>
                ))}

                {/* Next Button */}
                <li className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        className="pagination-button"
                        disabled={currentPage === totalPages}
                    >
                        &gt;
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
