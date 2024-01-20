import React, { useCallback } from "react";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";
import type { ChangeEvent } from "react";

export const EmptyDataView: DataViewerComponent<Cell> = ({ cell }) => {
  return <span className="w-full">{cell?.value}</span>;
};

export const EmptyDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...cell, value: event.target.value });
    },
    [cell, onChange]
  );

  return (
    <input
      autoFocus
      type="text"
      className="outline-none w-full h-full"
      onChange={handleChange}
      value={cell?.value}
    />
  );
};
