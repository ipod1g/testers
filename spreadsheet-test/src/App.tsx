import { CloseOutlined, AddCircleOutline } from "@material-ui/icons";
import React, { useCallback, useMemo, useState } from "react";

import { createEmptyMatrix } from "./lib/react-spreadsheet";
import * as Matrix from "./lib/react-spreadsheet/matrix";
import { Spreadsheet } from "./Spreadsheet";
import { columnHeaders } from "./Spreadsheet/config";
import { CustomCell } from "./Spreadsheet/CustomCell";
import { DataEditorRenderer } from "./Spreadsheet/DataComponents/DataEditorRenderer";
import { DataViewerRenderer } from "./Spreadsheet/DataComponents/DataViewerRenderer";

import type { SortingState, StringCell } from "./Spreadsheet/types";

const INITIAL_ROWS = 6;
const INITIAL_COLUMNS = columnHeaders.length - 1;
const EMPTY_DATA = createEmptyMatrix<StringCell>(INITIAL_ROWS, INITIAL_COLUMNS);

const App = () => {
  //* data from server
  const [data, setData] = useState(EMPTY_DATA);

  const addRow = useCallback(() => {
    setData((_data) => {
      const { columns } = Matrix.getSize(_data);
      return [..._data, Array(columns)];
    });
  }, [setData]);

  const deleteRow = useCallback(
    (idx: number) => {
      setData((_data) => {
        return [..._data.slice(0, idx), ..._data.slice(idx + 1)];
      });
    },
    [setData]
  );

  // this sort should be moved to redux
  const [sort, setSort] = useState<SortingState>({
    id: "company",
    direction: "none",
  });

  const sorted = useMemo(() => {
    const sortedData = [...data];
    if (sort.direction === "none") return data;

    const col = columnHeaders.findIndex((header) => header.value === sort.id);

    const _sorted = sortedData.sort((a, b) => {
      const valueA = a[col - 1]?.value ?? "";
      const valueB = b[col - 1]?.value ?? "";

      if (sort.direction === "asc") {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
      } else {
        // sort.direction === "desc"
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
      }
      return 0;
    });

    return _sorted;
  }, [data, sort]);

  return (
    <div id="Spreadsheet__wrapper" className="w-fit relative">
      <div className="flex flex-row relative z-10">
        <Spreadsheet
          DataViewer={DataViewerRenderer}
          DataEditor={DataEditorRenderer}
          // @ts-expect-error -- custom cell
          Cell={CustomCell}
          data={sorted}
          onChange={setData}
          // hideRowIndicators
        />
        <div className="">
          <th className="Spreadsheet__header"></th>
          {Array(sorted.length)
            .fill("")
            .map((_, idx) => (
              <div className="h-12 relative flex justify-center items-center peer-hover/row:bg-slate-950">
                <button
                  onClick={() => {
                    deleteRow(idx);
                  }}
                  className="h-3/5 aspect-square bg-rose-400 hover:cursor-pointer rounded-md flex justify-center items-center"
                >
                  <CloseOutlined className="text-white" />
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full px-12 py-2">
        <button
          onClick={addRow}
          className="bg-white opacity-80 w-full py-2 rounded-lg hover:opacity-100 shadow-md border"
        >
          <AddCircleOutline color="action" />
        </button>
        {/* buttons below are for demo */}
        <SortButton
          setSort={setSort}
          sort={{
            id: "",
            direction: "none",
          }}
        />
        <SortButton
          setSort={setSort}
          sort={{
            id: "company",
            direction: "asc",
          }}
        />
        <SortButton
          setSort={setSort}
          sort={{
            id: "company",
            direction: "desc",
          }}
        />
        <SortButton
          setSort={setSort}
          sort={{
            id: "position",
            direction: "asc",
          }}
        />
        <SortButton
          setSort={setSort}
          sort={{
            id: "position",
            direction: "desc",
          }}
        />
      </div>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export -- default behaviour
export default App;

function SortButton({
  setSort,
  sort,
}: {
  setSort: React.Dispatch<React.SetStateAction<SortingState>>;
  sort: SortingState;
}) {
  return (
    <button
      onClick={() => {
        setSort({
          id: sort.id,
          direction: sort.direction,
        });
      }}
      className="bg-white opacity-80 w-1/3 py-2 rounded-lg hover:opacity-100 shadow-md border"
    >
      {`${sort.id} sort ${sort.direction}`}
    </button>
  );
}
