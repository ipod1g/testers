import * as React from 'react';
import type {
  DataEditorComponent,
  DataViewerComponent,
} from 'react-spreadsheet';
import type { Cell } from '../types';
import useDebounce from '../useDebounce';
import { positionOptions } from '../config';

export const PositionDataView: DataViewerComponent<Cell> = ({ cell }) => {
  return <span>{cell?.value}</span>;
};

export const PositionDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
}) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...cell, value: event.target.value });
    },
    [cell, onChange]
  );

  const searchText = cell?.value ?? '';
  const debouncedSearchText = useDebounce(searchText, 200);
  const [searchSelection, setSearchSeletion] = React.useState(-1);

  // improve filter logic
  const filteredSuggestion = [...positionOptions].filter(
    (item) =>
      item.label.includes(debouncedSearchText) ||
      item.label.toLowerCase().includes(debouncedSearchText)
  );

  function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowUp' && searchSelection >= 0) {
      setSearchSeletion((prev) => prev - 1);
    } else if (
      event.key === 'ArrowDown' &&
      searchSelection < filteredSuggestion.length - 1
    ) {
      setSearchSeletion((prev) => prev + 1);
    } else if (event.key === 'Enter' && searchSelection >= 0) {
      onChange({ ...cell, value: filteredSuggestion[searchSelection]?.label });
    }
  }

  return (
    <div className="text-left">
      <input
        autoFocus
        type="text"
        className="w-full h-full outline-none"
        onChange={handleChange}
        value={searchText}
        onKeyDown={handleKeydown}
      />
      <div className="flex flex-col absolute top-full h-30 overflow-x-hidden overflow-y-auto w-full left-0 z-20 bg-neutral-100 shadow-lg border border-neutral-300 rounded-b-md">
        {filteredSuggestion.map((item, idx) => (
          <div
            key={item.label}
            className={`hover:cursor-pointer hover:bg-zinc-100 w-full h-fit px-2 py-2 ${
              idx === searchSelection
                ? 'bg-white border-neutral-400 border rounded-md'
                : null
            }`}
            onClick={() => {
              onChange({ ...cell, value: item.label });
            }}
          >
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
