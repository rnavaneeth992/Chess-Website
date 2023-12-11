import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import Swal from "sweetalert2";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const MyGrid = ({data}) => {
//   let data = [
//     { make: "Toyota", model: "Celica", price: 35000 },
//     { make: "Ford", model: "Mondeo", price: 32000 },
//     { make: "Porsche", model: "Boxter", price: 72000 },
//   ];

  if (data.length == 0) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No data found",
    });
  }

  const createObj = (name) => {
    return {field: name}
  }

  let columns = Object.keys(data[0]);
  let columnDefs = columns.map((name) => createObj(name))

//   const [columnDefs] = useState([
//     { field: "make" },
//     { field: "model" },
//     { field: "price" }
//   ]);

  return (
    <div className="ag-theme-alpine" style={{height: "600px", width: "100%"}}>
      <AgGridReact rowData={data} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
};

export default MyGrid;
