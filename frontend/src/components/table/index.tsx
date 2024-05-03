import React, { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";

interface ServerSideDataTableProps {
  columns: MUIDataTableColumn[];
  options: any;
  data: any;
  totalRows: number;
}

const ServerSideDataTable: React.FC<ServerSideDataTableProps> = ({
  columns,
  options,
  data,
  totalRows,
}) => {

  return (
    <MUIDataTable
      title={options.title || ""}
      data={data}
      columns={columns}
      options={{
        ...options,
        serverSide: false,
        count: totalRows,
        download: false,
        print: false,
        filter: false,
      }}
    />
  );
};

export default ServerSideDataTable;
