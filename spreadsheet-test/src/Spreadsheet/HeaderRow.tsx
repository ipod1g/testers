/* eslint-disable no-unused-vars -- temp for dev*/
/* eslint-disable @typescript-eslint/no-unused-vars -- temp for dev  */
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  UnfoldMore,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import { columnHeaders } from "./config";
import { setSortingState } from "../store/jobSlice.js";

import type { SortingState } from "./types";

type THeaderColumnCellBase = (typeof columnHeaders)[number];

type THeaderColumnCell = THeaderColumnCellBase & {
  handleSelectEntireColumn: () => void;
};

const HeaderRow = ({
  handleSelectEntireColumn,
}: {
  handleSelectEntireColumn: (idx: number) => void;
}) => {
  return (
    <tr className="Spreadsheet__cell bg-[#E1E7EA] text-[#606060]">
      {columnHeaders.map((col, idx) => (
        <HeaderColumnCell
          cellWidth={col.cellWidth}
          handleSelectEntireColumn={() => {
            if (idx === 0) return null;
            handleSelectEntireColumn(idx - 1);
          }}
          icon={col.icon}
          key={col.value + col.label}
          label={col.label}
          value={col.value}
        />
      ))}
    </tr>
  );
};

function HeaderColumnCell({
  icon,
  label,
  cellWidth,
  value,
  handleSelectEntireColumn,
}: THeaderColumnCell) {
  const dispatch = useDispatch();
  const sortingState = useSelector(
    (state) => state.sortingState
  ) as SortingState;

  function handleSort() {
    if (sortingState.direction === "none") {
      dispatch(setSortingState({ id: value, direction: "asc" }));
    } else if (sortingState.direction === "asc") {
      dispatch(setSortingState({ id: value, direction: "desc" }));
    } else {
      dispatch(setSortingState({ id: value, direction: "none" }));
    }
  }

  const isException = value === "empty" || value === "bookmark";

  function handleSortIconRender() {
    if (sortingState.direction === "desc") {
      return <KeyboardArrowUp fontSize="small" />;
    }
    if (sortingState.direction === "asc") {
      return <KeyboardArrowDown fontSize="small" />;
    }
    return <UnfoldMore fontSize="small" />;
  }

  return (
    <th
      className="Spreadsheet__header"
      style={{
        border: isException ? 0 : "",
      }}
    >
      <div className="flex flex-row">
        <button
          className="flex gap-4 items-center px-5"
          onClick={handleSelectEntireColumn}
          style={{
            width: cellWidth,
            maxWidth: cellWidth,
          }}
          type="button"
        >
          <i>{icon ? icon : null}</i>
          {value === "empty" ? "" : label}
        </button>
        {!isException ? (
          <button
            className="w-8"
            onClick={() => {
              handleSort();
            }}
            type="button"
          >
            {handleSortIconRender()}
          </button>
        ) : null}
      </div>
    </th>
  );
}

export { HeaderRow };
