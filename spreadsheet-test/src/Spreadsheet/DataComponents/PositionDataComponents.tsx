import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useCallback } from "react";

import { positionOptions } from "../config";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";
import type { ChangeEvent } from "react";

const filter = createFilterOptions<typeof positionOptions>();

export const PositionDataView: DataViewerComponent<Cell> = ({ cell }) => {
  return <span>{cell?.value}</span>;
};

export const PositionDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<object>, value: string | { label: string }) => {
      if (typeof value === "string") {
        onChange({ ...cell, value });
      } else {
        onChange({ ...cell, value: value.label });
        const target = event.target as HTMLInputElement;
        target.blur();
      }
    },
    [cell, onChange]
  );

  return (
    <div className="flex items-center w-full">
      <Autocomplete
        className="w-full"
        disableClearable
        filterOptions={(options, params) => {
          // @ts-expect-error -- fix type value[][]
          const filtered = filter(options, params);
          return filtered.flat();
        }}
        freeSolo
        getOptionLabel={(option) => {
          //* Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          return option.label;
        }}
        handleHomeEndKeys
        onChange={handleChange}
        openOnFocus
        options={positionOptions}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              autoFocus
              className="w-full h-full"
              type="text"
              {...params.inputProps}
            />
          </div>
        )}
        renderOption={(option) => <div className="w-full">{option.label}</div>}
        value={cell?.value ?? ""}
      />
    </div>
  );
};
