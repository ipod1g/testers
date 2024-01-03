import React from 'react';
import type { Cell } from '../types';
import type {
  DataEditorComponent,
  DataViewerComponent,
} from 'react-spreadsheet';

export const LinkDataView: DataViewerComponent<Cell> = ({ cell }) => {
  function isLinkPrefixed(link: string | undefined) {
    return link
      ? link.startsWith('https://') || link.startsWith('http://')
      : false;
  }

  return (
    <div>
      <a
        className="underline text-blue-600"
        href={
          isLinkPrefixed(cell?.value) ? cell?.value : `https://${cell?.value}`
        }
      >
        {cell?.value}
      </a>
    </div>
  );
};

export const LinkDataEdit: DataEditorComponent<Cell> = ({ cell, onChange }) => {
  // need to add like a click indicator after 1 secs to transition to editor
  // or find a way to overwrite click heirachy

  const inputValue = cell?.value ?? '';

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...cell, value: event.target.value });
    },
    [cell, onChange]
  );

  // return <LinkDataView cell={cell} />;

  return (
    <div>
      <input
        autoFocus
        type="text"
        className="outline-none w-full h-full text-blue-600"
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
};
