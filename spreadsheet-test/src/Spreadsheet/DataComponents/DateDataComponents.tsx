import React from 'react';
import type { Cell } from '../types';
import type {
  DataEditorComponent,
  DataViewerComponent,
} from 'react-spreadsheet';
import { Calendar } from '../Calendar';

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
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(cell?.value ?? '')
  );
  const [focus, setFocus] = React.useState<Date>();

  const handleChange = React.useCallback(
    (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      onChange({
        ...cell,
        value: selectedDate ? selectedDate?.toLocaleDateString() : undefined,
      });
      // exitEditMode();
    },
    [cell, onChange]
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleChange(focus);
    }
  };

  return (
    <div>
      <p className="mt-2.5">{cell?.value ?? ''}</p>
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
