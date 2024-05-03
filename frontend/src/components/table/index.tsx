import React, { useState, useEffect } from "react";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";

interface ServerSideDataTableProps {
  columns: MUIDataTableColumn[];
  options: any;
  fetchData: (page: number, rowsPerPage: number) => void;
  data: any;
  totalRows: number;
}

const ServerSideDataTable: React.FC<ServerSideDataTableProps> = ({
  columns,
  options,
  fetchData,
  data,
  totalRows,
}) => {
  const handleTableChange = (action: string, tableState: any) => {
    if (action === "changePage" || action === "changeRowsPerPage") {
      fetchData(tableState.page, tableState.rowsPerPage);
    }
  };

  useEffect(() => {
    fetchData(0, options.rowsPerPage || 10); // Fetch initial data
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <MUIDataTable
      title={options.title || ""}
      data={data}
      columns={columns}
      options={{
        ...options,
        serverSide: true,
        count: totalRows,
        onTableChange: handleTableChange,
        download: false,
        print: false,
        filter: false,
      }}
    />
  );
};

export default ServerSideDataTable;
