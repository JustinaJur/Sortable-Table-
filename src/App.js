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
      column: null,
      direction: "desc"
    },
    isActive: -1,
    currentSort: "default"
  };

  componentDidMount = async () => {
    const data = await getData();
    // const filteredData = data.filter(item => item.id && item.title && item.url);

    this.setState({
      data,
      currentData: data.slice(0, 10)
    });

    //console.log(filteredData);
    console.log(this.state.data);
  };

  paginate = pageNumber => {
    const { data } = this.state;
    console.log(pageNumber);

    const indexOfLastPost = pageNumber * 10;
    const indexOfFirstPost = indexOfLastPost - 10;
    const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

    this.setState({
      currentData,
      sort: {
        direction: "desc"
      }
    });
  };

  handleDataVisibility = () => {
    const { showAllData } = this.state;

    this.setState({
      showAllData: !showAllData
    });
  };

  onSort = column => e => {
    const { data, currentData, sort, showAllData } = this.state;

    //const dataToSort = showAllData ? data : currentData;

    const direction = sort.column
      ? sort.direction === "asc"
        ? "desc"
        : "asc"
      : "desc";

    // const direction = sort.direction === "desc" ? "asc" : "desc";
    const dataToSort = showAllData ? data : currentData;

    const sortedData = dataToSort.sort((a, b) => {
      // if (a < b) {
      //   return -1;
      // }
      // if (a > b) {
      //   return 1;
      // } else {

      return a.id - b.id;
    });

    console.log(this.state.sort.direction, column);

    if (direction === "desc") {
      sortedData.reverse();
    }

    this.setState({
      // currentData: sortedData,
      sort: {
        column,
        direction
      }
    });

    console.log(this.state.sort.direction, column);
    // console.log("sort", this.state.sort);
  };

  // onSortChange = () => {
  //   const { currentSort } = this.state;
  //   let nextSort;

  //   if (currentSort === "down") nextSort = "up";
  //   else if (currentSort === "up") nextSort = "default";
  //   else if (currentSort === "default") nextSort = "down";

  //   this.setState({
  //     currentSort: nextSort
  //   });
  // };

  toggleActive = i => {
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

    //padaryk viena
    if (direction === "next") {
      this.setState({
        currentPage: currentPage + 1
      });
      this.paginate(currentPage + 1);
    } else if (direction === "back") {
      this.setState({
        currentPage: currentPage - 1
      });
      this.paginate(currentPage - 1);
    }
  };

  render() {
    const {
      data,
      currentData,
      showAllData,
      isActive,
      currentPage
    } = this.state;

    // console.log(currentData);
    // console.log(isActive);

    // const indexOfLastPost = currentPage * 10;
    // const indexOfFirstPost = indexOfLastPost - 10;
    // const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

    if (data.length < 1) {
      return <h2 className="spinner">Loading...</h2>;
    }
    return (
      <div className="c-table">
        <h1>Sortable Table</h1>
        <hr />
        <p>Selected data:</p>
        {isActive > -1 ? (
          <>
            <div className="bold">
              {showAllData ? data[isActive].id : currentData[isActive].id}
            </div>
            <div className="bold">
              {showAllData ? data[isActive].title : currentData[isActive].title}
            </div>
            <div className="bold">
              {showAllData ? data[isActive].url : currentData[isActive].url}
            </div>
          </>
        ) : (
          "none"
        )}
        <hr />
        <button onClick={this.handleDataVisibility}>
          {showAllData ? "Show Paginated data" : "Show All Data"}
        </button>
        <hr />
        {!showAllData && (
          <Pagination
            //postsPerPage={1000}
            totalPosts={data.length}
            paginate={this.paginate}
            currentPage={currentPage}
            changePage={this.changePage}
          />
        )}
        <Table
          photos={showAllData ? data : currentData}
          onSort={this.onSort}
          onSelect={this.onSelect}
          isActive={isActive}
          toggleActive={this.toggleActive}
          /// onSortChange={this.onSortChange}
        />
      </div>
    );
  }
}

export default App;
