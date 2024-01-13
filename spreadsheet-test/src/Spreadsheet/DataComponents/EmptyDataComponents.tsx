import React from 'react';
import type { Cell } from '../types';
import type {
  DataEditorComponent,
  DataViewerComponent,
} from '../../lib/react-spreadsheet';

export const EmptyDataView: DataViewerComponent<Cell> = ({ cell }) => {
  return <span className="w-full">{cell?.value}</span>;
};

export const EmptyDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
}) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
