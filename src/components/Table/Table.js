import React from "react";

const Table = ({ data, onSort, toggleActiveRow, isActive }) => (
  <table>
    <thead>
      <tr>
        <th onClick={onSort}>Photo ID</th>
        <th onClick={onSort}>Album ID</th>
        <th onClick={onSort}>Title</th>
        <th onClick={onSort}>Url</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, i) => {
        return (
          <tr
            style={
              isActive === i ? { background: "pink" } : { background: null }
            }
            key={i}
            onClick={() => toggleActiveRow(i)}
          >
            <td>{item.id}</td>
            <td>{item.albumId}</td>
            <td>{item.title}</td>
            <td>{item.url}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default Table;
