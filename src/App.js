import React from "react";

import Pagination from "./components/Pagination/Pagination";
import Table from "./components/Table/Table";
import "./App.css";

import { getData } from "./api/api";

class App extends React.Component {
  state = {
    data: [],
    currentData: [],
    showAllData: false,
    currentPage: 1,
    sort: {
      direction: "asc"
    },
    isActive: -1
  };

  componentDidMount = async () => {
    const data = await getData();

    this.setState({
      data,
      currentData: data.slice(0, 10)
    });
  };

  paginate = pageNumber => {
    const { data } = this.state;

    const dataToShow = data[0].id !== 1 ? data.reverse() : data;
    const indexOfLastPost = pageNumber * 10;
    const indexOfFirstPost = indexOfLastPost - 10;
    const currentData = dataToShow.slice(indexOfFirstPost, indexOfLastPost);

    this.setState({
      currentData,
      sort: {
        direction: "asc"
      }
    });
  };

  handleDataVisibility = () => {
    const { showAllData } = this.state;

    this.setState({
      showAllData: !showAllData,
      sort: { direction: "asc" }
    });
  };

  onSort = () => {
    const { data, currentData, sort, showAllData } = this.state;

    const direction = sort.direction === "desc" ? "asc" : "desc";
    const dataToSort = showAllData ? data : currentData;

    const sortedData = dataToSort.sort((a, b) => {
      return a.id - b.id;
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    this.setState({
      sort: {
        direction
      }
    });
  };

  toggleActiveRow = i => {
    const { isActive } = this.state;

    if (i === isActive) {
      this.setState({
        isActive: null
      });
    } else {
      this.setState({
        isActive: i
      });
    }
  };

  changePage = direction => {
    const { currentPage } = this.state;

    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;

    this.setState({
      currentPage: newPage
    });
    this.paginate(newPage);
  };

  render() {
    const {
      data,
      currentData,
      showAllData,
      isActive,
      currentPage
    } = this.state;

    if (data.length < 1) {
      return <h2 className="spinner">Loading...</h2>;
    }
    return (
      <div className="c-table">
        <h1>Sortable Table</h1>
        <hr />
        <p>Selected data:</p>
        {isActive !== null && isActive > -1 ? (
          <>
            <div className="bold">
              Photo ID:
              {showAllData ? data[isActive].id : currentData[isActive].id}
            </div>
            <div className="bold">
              Album ID:
              {showAllData
                ? data[isActive].albumId
                : currentData[isActive].albumId}
            </div>
            <div className="bold">
              Title:
              {showAllData ? data[isActive].title : currentData[isActive].title}
            </div>
            <div className="bold">
              Url:
              {showAllData ? data[isActive].url : currentData[isActive].url}
            </div>
          </>
        ) : (
          "none"
        )}
        <hr />
        <button onClick={this.handleDataVisibility}>
          {showAllData ? "Show Paginated Data" : "Show All Data"}
        </button>
        <hr />
        {!showAllData && (
          <Pagination
            totalItems={data.length}
            currentPage={currentPage}
            changePage={this.changePage}
          />
        )}
        <Table
          data={showAllData ? data : currentData}
          onSort={this.onSort}
          isActive={isActive}
          toggleActiveRow={this.toggleActiveRow}
        />
      </div>
    );
  }
}

export default App;
