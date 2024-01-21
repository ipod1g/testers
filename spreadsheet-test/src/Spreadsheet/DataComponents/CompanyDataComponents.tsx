import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { useCallback } from "react";

import { companies } from "../config";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";
import type { ChangeEvent } from "react";

const filter = createFilterOptions<typeof companies>();

export const CompanyDataView: DataViewerComponent<Cell> = ({ cell }) => {
  const companyLogo = companies.find(
    (company) => company.label === cell?.value
  )?.logo;

  return (
    <div className="flex flex-row gap-2 pl-4 items-center relative">
      {companyLogo ? (
        <img alt="company-logo" height={24} src={companyLogo} width={24} />
      ) : (
        <span className="w-6 h-6" />
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
    (_event: ChangeEvent<object>, value: string | { label: string }) => {
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
        disableClearable
        filterOptions={(options, params) => {
          // @ts-expect-error -- fix type value[][]
          const filtered = filter(options, params);
          return filtered.flat();
        }}
        freeSolo
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          return option.label;
        }}
        handleHomeEndKeys
        onChange={handleChange}
        openOnFocus
        options={companies}
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
        renderOption={(option) => (
          <div className="flex gap-2">
            <img
              alt="option-logo"
              className="rounded-sm"
              height={24}
              src={
                option.logo
                  ? option.logo
                  : "https://careerhacker-ios.s3-ap-southeast-1.amazonaws.com/rounded_logo.png"
              }
              width={24}
            />
            {option.label}
          </div>
        )}
        value={cell?.value ?? ""}
      />
    </div>
  );
};
