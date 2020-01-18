import React from "react";

const Table = ({ photos, onSort, toggleActive, isActive }) => (
  <table>
    <thead>
      <tr>
        {/* <th onClick={this.onSortChange("id")}> */}
        <th onClick={onSort("id")}>
          {/* <th onClick={() => this.props.sort("id")}> */}
          Song ID
          {/* <span className={this.setArrow("id")}></span> */}
        </th>
        <th onClick={onSort("title")}>
          Title
          {/* <span className={this.setArrow("title")}></span> */}
        </th>
        <th onClick={onSort("url")}>
          Url
          {/* <span className={this.setArrow("title")}></span> */}
        </th>
      </tr>
    </thead>
    <tbody>
      {/* {[...photos].map(item => (
        <tr>
          <td>{item.id}</td>
          <td>${item.title}b</td>
          <td>${item.url}b</td>
        </tr>
      ))} */}

      {photos.map((item, i) => {
        return (
          <tr
            style={
              isActive === i ? { background: "pink" } : { background: null }
            }
            key={i}
            onClick={() => toggleActive(i)}
          >
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.url}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

// class Table extends React.Component {
//   state = {
//     currentSort: "default"
//   };

//   onSortChange = () => {
//     const { currentSort } = this.state;
//     let nextSort;

//     if (currentSort === "down") nextSort = "up";
//     else if (currentSort === "up") nextSort = "default";
//     else if (currentSort === "default") nextSort = "down";

//     this.setState({
//       currentSort: nextSort
//     });
//   };

//   render() {
//     const { data } = this.props;
//     const { currentSort } = this.state;

//     return (
//       <table>
//         <thead>
//           <tr>
//             {/* <th onClick={this.onSortChange("id")}> */}
//             <th onClick={onSort("id")}>
//               {/* <th onClick={() => this.props.sort("id")}> */}
//               Song ID
//               {/* <span className={this.setArrow("id")}></span> */}
//             </th>
//             <th onClick={onSort("title")}>
//               Title
//               {/* <span className={this.setArrow("title")}></span> */}
//             </th>
//             <th onClick={onSort("url")}>
//               Url
//               {/* <span className={this.setArrow("title")}></span> */}
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...data].sort(sortTypes[currentSort].fn).map(p => (
//             <tr>
//               <td>{p.id}</td>
//               <td>${p.title}b</td>
//               <td>${p.url}b</td>
//             </tr>
//           ))}

//           {/* {photos.map((item, i) => {
//         return (
//           <tr
//             style={
//               isActive === i ? { background: "pink" } : { background: null }
//             }
//             key={i}
//             onClick={() => toggleActive(i)}
//           >
//             <td>{item.id}</td>
//             <td>{item.title}</td>
//             <td>{item.url}</td>
//           </tr>
//         );
//       })} */}
//         </tbody>
//       </table>
//     );
//   }
// }

export default Table;
