// The Pagination component generates page number buttons based on the total number of pages,
// highlighting the current page and triggering a page change when a button is clicked.

function Pagination({ currentPage, totalPages, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
        {pageNumbers.map((number) => (
          <li key={number} className={`pagination-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => paginate(number)} className="pagination-button">
              {number}
            </button>
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

  