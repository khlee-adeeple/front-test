"use client";

import React, { useMemo, useState } from "react"; // 리액트 훅
import { AgGridReact } from "ag-grid-react"; // AG Grid의 테이블 컴포넌트
import {
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  ValidationModule,
} from "ag-grid-community"; // AG Grid의 무료 라이선스 중 필요한 모듈 불러오기

import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  PivotModule,
  RowGroupingPanelModule,
} from "ag-grid-enterprise"; // AG Grid의 유료 라이선스 중 필요한 모듈 불러오기

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  PivotModule,
  FiltersToolPanelModule,
  RowGroupingPanelModule,
  ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]); // AG Grid의 모듈 사용하기

import { useFetchJson } from "../../api/useFetchJson"; // 임시 데이터 불러오는 파일 불러오기

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
} // TypeScript의 파일 형식 지정하기

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []); // 스타일에 대한 내용 (크게 상관 없음)
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []); // 스타일에 대한 내용 (크게 상관 없음)

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "country", rowGroup: true },
    { field: "sport", pivot: true },
    { field: "year", pivot: true },
    { field: "gold", aggFunc: "sum" },
  ]); // 테이블 헤더 지정하기

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 130,
      enableValue: true,
      enableRowGroup: true,
      enablePivot: true,
    };
  }, []); // 테이블 헤더 기본 값 지정

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 200,
      pinned: "left",
    };
  }, []); // 그룹지어진 칼럼 속성 지정

  const { data, loading } = useFetchJson<IOlympicData>(
    "https://www.ag-grid.com/example-assets/olympic-winners.json"
  ); // 데이터 및 로딩 불러오기

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact<IOlympicData>
          rowData={data} // 테이블에 실제 그려줄 데이터
          loading={loading} // 로딩
          columnDefs={columnDefs} // 테이블 헤더
          defaultColDef={defaultColDef} // 칼럼에 대한 기본 속성
          autoGroupColumnDef={autoGroupColumnDef} // 같은 값에 대해
          pivotMode={true} // 피봇테이블 사용 여부
          sideBar={"columns"} // 사이드바 제목
          pivotPanelShow={"always"} // 피봇패널 노출 여부
        />
      </div>
    </div>
  );
};

export default GridExample;
