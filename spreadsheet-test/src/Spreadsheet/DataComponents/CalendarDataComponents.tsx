import { useCallback, useState } from "react";

import { Calendar } from "../Calendar";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";
import type { KeyboardEvent } from "react";

export const CalendarDataView: DataViewerComponent<Cell> = ({ cell }) => {
  // TODO: if cell value does not fit format make it empty
  return <p className="text-center mx-auto">{cell?.value}</p>;
};

export const CalendarDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
  exitEditMode,
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
      exitEditMode();
    },
    [cell, exitEditMode, onChange]
  );

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChange(focus);
    }
  };

  return (
    <div>
      <p className="mt-2.5">{cell?.value ?? ""}</p>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- parent keypress handler required*/}
      <div
        className="absolute top-full left-0 w-[250px] h-[350px] bg-white rounded-md border select-none"
        onKeyDown={handleKeyPress}
      >
        <Calendar
          initialFocus
          mode="single"
          onDayFocus={setFocus}
          onSelect={handleChange}
          selected={date}
        />
      </div>
    </div>
  );
};
