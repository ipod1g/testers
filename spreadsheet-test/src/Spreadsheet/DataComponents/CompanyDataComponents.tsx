import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import React, { useCallback } from "react";

import { companies } from "../config";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";

const filter = createFilterOptions<typeof companies>();

export const CompanyDataView: DataViewerComponent<Cell> = ({ cell }) => {
  const companyLogo = companies.find(
    (company) => company.label === cell?.value
  )?.logo;

  return (
    <div className="flex flex-row gap-2 pl-4 items-center relative">
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
  exitEditMode,
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<object>, value: string | { label: string }) => {
      if (typeof value === "string") {
        onChange({ ...cell, value });
      } else {
        onChange({ ...cell, value: value.label });
        exitEditMode();
      }
    },
    [cell, exitEditMode, onChange]
  );

  return (
    <div className="flex items-center ">
      <Autocomplete
        value={cell?.value ?? ""}
        disableClearable
        openOnFocus
        onChange={handleChange}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          return filtered;
        }}
        handleHomeEndKeys
        options={companies}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          return option.label;
        }}
        renderOption={(option) => (
          <div className="flex gap-2">
            <img
              src={
                option.logo
                  ? option.logo
                  : "https://careerhacker-ios.s3-ap-southeast-1.amazonaws.com/rounded_logo.png"
              }
              width={24}
              height={24}
              className="rounded-sm"
            />
            {option.label}
          </div>
        )}
        freeSolo
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              autoFocus
              type="text"
              className="w-full h-full"
              {...params.inputProps}
            />
          </div>
        )}
      />
    </div>
  );
};
