import { Calendar } from "../Calendar";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";
import { useCallback, useState } from "react";

export const DateDataView: DataViewerComponent<Cell> = ({
  cell,
  // setCellData,
}) => {
  // if cell value does not fit format make it empty
  return <span>{cell?.value}</span>;
};

export const DateDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
  // exitEditMode,
}) => {
  const [date, setDate] = useState<Date | undefined>(
    new Date(cell?.value ?? "")
  );
  const [focus, setFocus] = useState<Date>();

  const handleChange = useCallback(
    (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      onChange({
        ...cell,
        value: selectedDate ? selectedDate.toLocaleDateString() : undefined,
      });
      // exitEditMode();
    },
    [cell, onChange]
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChange(focus);
    }
  };

  return (
    <div>
      <p className="mt-2.5">{cell?.value ?? ""}</p>
      <div
        onKeyDown={handleKeyPress}
        className="absolute top-full left-0  w-[250px] h-[350px] bg-white rounded-md border"
      >
        <Calendar
          mode="single"
          selected={date}
          onDayFocus={setFocus}
          onSelect={handleChange}
          initialFocus
        />
      </div>
    </div>
  );
};
