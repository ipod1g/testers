import type { Cell } from '../types';
import type {
  DataEditorComponent,
  DataViewerComponent,
} from 'react-spreadsheet';
import useDebounce from '../useDebounce';
import React from 'react';
import { companies } from '../config';

export const CompanyDataView: DataViewerComponent<Cell> = ({ cell }) => {
  const companyLogo = companies.find(
    (company) => company.label === cell?.value
  )?.logo;

  return (
    <div className="flex flex-row gap-6 pl-10 items-center relative">
      {companyLogo ? (
        <img src={companyLogo} width={24} height={24} />
      ) : (
        <span className="w-6 h-6"></span>
      )}
      {cell?.value}
    </div>
  );
};

export const CompanyDataEdit: DataEditorComponent<Cell> = ({
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
  const filteredSuggestion = [...companies].filter(
    (item) =>
      item.label.includes(debouncedSearchText) ||
      item.label.toLowerCase().includes(debouncedSearchText)
  );

  const companyLogo = companies.find(
    (company) => company.label === cell?.value
  )?.logo;

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
    <div className="flex flex-row gap-6 pl-10 items-center">
      {companyLogo ? (
        <img src={companyLogo} width={24} height={24} />
      ) : (
        <span className="w-6 h-6"></span>
      )}
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
            tabIndex={1}
            className={`hover:cursor-pointer hover:bg-white w-full h-fit flex flex-row gap-6 px-10 py-2 ${
              idx === searchSelection
                ? 'bg-white border-neutral-400 border rounded-md'
                : null
            }`}
            onClick={() => {
              onChange({ ...cell, value: item.label });
            }}
          >
            {item.logo ? (
              <img src={item.logo} width={24} height={24} />
            ) : (
              <span className="w-6 h-6"></span>
            )}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
