"use client";

import React, {
  //   useCallback,
  useMemo,
  //   useRef,
  useState,
  //   StrictMode,
} from "react";
// import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  //   ColGroupDef,
  //   GridApi,
  //   GridOptions,
  ModuleRegistry,
  //   SideBarDef,
  ValidationModule,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  PivotModule,
  RowGroupingPanelModule,
} from "ag-grid-enterprise";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  PivotModule,
  FiltersToolPanelModule,
  RowGroupingPanelModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);
import { useFetchJson } from "../../api/useFetchJson";

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "country", rowGroup: true },
    { field: "sport", pivot: true },
    { field: "year", pivot: true },
    { field: "gold", aggFunc: "sum" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 130,
      enableValue: true,
      enableRowGroup: true,
      enablePivot: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 200,
      pinned: "left",
    };
  }, []);

  const { data, loading } = useFetchJson<IOlympicData>(
    "https://www.ag-grid.com/example-assets/olympic-winners.json"
  );

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact<IOlympicData>
          rowData={data}
          loading={loading}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          pivotMode={true}
          sideBar={"columns"}
          pivotPanelShow={"always"}
        />
      </div>
    </div>
  );
};

export default GridExample;
