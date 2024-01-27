import { CloseOutlined, AddCircleOutline } from "@material-ui/icons";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { createEmptyMatrix } from "./lib/react-spreadsheet";
import * as Matrix from "./lib/react-spreadsheet/matrix";
import { Spreadsheet } from "./Spreadsheet";
import { columnHeaders } from "./Spreadsheet/config";

import type { SortingState, StringCell } from "./Spreadsheet/types";

const INITIAL_ROWS = 6;
const INITIAL_COLUMNS = columnHeaders.length - 1;
const EMPTY_DATA = createEmptyMatrix<StringCell>(INITIAL_ROWS, INITIAL_COLUMNS);

function App() {
  //* data from server
  const [data, setData] = useState(EMPTY_DATA);

  const sortingState = useSelector(
    (state) => state.sortingState
  ) as SortingState;

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

  const sorted = useMemo(() => {
    const sortedData = [...data];
    if (sortingState.direction === "none") return data;

    const col = columnHeaders.findIndex(
      (header) => header.value === sortingState.id
    );

    const _sorted = sortedData.sort((a, b) => {
      const valueA = a[col - 1]?.value ?? "";
      const valueB = b[col - 1]?.value ?? "";

      if (valueA === "" || valueB === "") return 0;
      if (sortingState.direction === "asc") {
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
  }, [data, sortingState]);

  return (
    <div className="w-fit relative" id="Spreadsheet__wrapper">
      <div className="flex flex-row relative z-10">
        <Spreadsheet
          data={sorted}
          onChange={setData}
          // hideRowIndicators
        />
        <div className="">
          <div className="Spreadsheet__header h-12 max-h-[48px]" />
          {Array(sorted.length)
            // TODO: combine this to work within Spreadsheet component
            .fill("")
            .map((_, idx) => (
              <div
                className="h-12 relative flex justify-center items-center peer-hover/row:bg-slate-950"
                // eslint-disable-next-line react/no-array-index-key -- only idx available
                key={`deleteRow-${idx}`}
              >
                <button
                  className="h-3/5 aspect-square bg-rose-400 hover:cursor-pointer rounded-md flex justify-center items-center"
                  onClick={() => {
                    deleteRow(idx);
                  }}
                  type="button"
                >
                  <CloseOutlined className="text-white" />
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full px-12 py-2">
        <button
          className="bg-white opacity-80 w-full py-2 rounded-lg hover:opacity-100 shadow-md border"
          onClick={addRow}
          type="button"
        >
          <AddCircleOutline color="action" />
        </button>
      </div>
    </div>
  );
}

// eslint-disable-next-line import/no-default-export -- default behaviour
export default App;
