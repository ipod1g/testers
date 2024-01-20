/* eslint-disable @typescript-eslint/no-unused-vars -- temp for dev */
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  UnfoldMore,
} from "@material-ui/icons";
import { useState } from "react";

import { columnHeaders } from "./config";

import type { SortingState } from "./types";

type THeaderColumnCellBase = (typeof columnHeaders)[number];

type THeaderColumnCell = THeaderColumnCellBase & {
  handleSelectEntireColumn: () => void;
};

function HeaderRow({
  handleSelectEntireColumn,
}: {
  handleSelectEntireColumn: (idx: number) => void;
}) {
  return (
    <tr className="Spreadsheet__cell bg-[#E1E7EA] text-[#606060]">
      {columnHeaders.map((col, idx) => (
        <HeaderColumnCell
          handleSelectEntireColumn={() => {
            if (idx === 0) return null;
            handleSelectEntireColumn(idx - 1);
          }}
          key={col.value + idx}
          icon={col.icon}
          label={col.label}
          value={col.value}
          cellWidth={col.cellWidth}
        />
      ))}
    </tr>
  );
}

function HeaderColumnCell({
  icon,
  label,
  cellWidth,
  value,
  handleSelectEntireColumn,
}: THeaderColumnCell) {
  // function handleSort() {
  //   if (sortingState.direction === "none") {
  //     setSortingState({ id: value, direction: "asc" });
  //   } else if (sortingState.direction === "asc") {
  //     setSortingState({ id: value, direction: "desc" });
  //   } else {
  //     setSortingState({ id: value, direction: "none" });
  //   }
  // }

  const isException = value === "empty" || value === "bookmark";

  return (
    <th
      style={{
        border: isException ? 0 : "",
      }}
      className="Spreadsheet__header"
    >
      <div className="flex flex-row">
        <span
          onClick={handleSelectEntireColumn}
          style={{
            width: cellWidth,
            maxWidth: cellWidth,
          }}
          className="flex gap-4 items-center px-5"
        >
          <i>{icon ? icon : null}</i>
          {value === "empty" ? "" : label}
        </span>
        {/* {!isException ? (
          <span className="w-8" onClick={handleSort}>
            {sortingState.direction === "desc" ? (
              <KeyboardArrowUp fontSize="small" />
            ) : sortingState.direction === "asc" ? (
              <KeyboardArrowDown fontSize="small" />
            ) : (
              <UnfoldMore fontSize="small" />
            )}
          </span>
        ) : null} */}
      </div>
    </th>
  );
}

export { HeaderRow };
