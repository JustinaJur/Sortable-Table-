import React from "react";

const Pagination = ({ totalItems, currentPage, changePage }) => {
  return (
    <div>
      {currentPage > 1 ? (
        <button
          onClick={() => changePage("back")}
          className="pagination-button"
        >
          back
        </button>
      ) : null}
      {totalItems - 1 > currentPage * 10 ? (
        <button
          onClick={() => changePage("next")}
          className="pagination-button"
        >
          next
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
