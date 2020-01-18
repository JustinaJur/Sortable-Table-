import React from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  changePage
}) => {
  const pageNumbers = [];

  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  // const totalPages = totalPosts / postsPerPage;
  // console.log(totalPages);
  // console.log(totalPosts);
  //https://stackoverflow.com/questions/40232847/how-to-implement-pagination-in-reactjs
  return (
    <nav>
      {/* <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <p onClick={() => paginate(number)} className="page-number">
              {number}
            </p>
          </li>
        ))}
      </ul> */}
      <div>
        {currentPage > 1 ? (
          <button
            onClick={() => changePage("back")}
            className="pagination-button"
          >
            back
          </button>
        ) : null}
        {totalPosts - 1 > currentPage * 10 ? (
          <button
            onClick={() => changePage("next")}
            className="pagination-button"
          >
            next
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Pagination;
