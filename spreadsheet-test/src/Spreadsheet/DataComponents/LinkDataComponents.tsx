import { useCallback } from "react";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";
import type { ChangeEvent } from "react";

export const LinkDataView: DataViewerComponent<Cell> = ({ cell }) => {
  function isLinkPrefixed(link: string | undefined) {
    return link
      ? link.startsWith("https://") || link.startsWith("http://")
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
  const inputValue = cell?.value ?? "";

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ ...cell, value: event.target.value });
    },
    [cell, onChange]
  );

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
