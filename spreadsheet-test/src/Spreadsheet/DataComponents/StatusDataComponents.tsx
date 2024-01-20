import { useCallback, useMemo } from "react";
import Select from "react-select";

import { statusOptions } from "../config";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";
import type { SingleValue, StylesConfig } from "react-select";

const colorStyles: StylesConfig<{ color: string }, true> = {
  control: (defaultStyles) => ({
    ...defaultStyles,
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
    width: "164px",
  }),
  singleValue: (defaultStyles, { data }) => ({
    ...defaultStyles,
    backgroundColor: data.color,
    padding: "2px",
    borderRadius: "24px",
    width: "120px",
    textAlign: "center",
    ":hover": {
      cursor: "pointer",
    },
  }),
  container: (defaultStyles) => {
    return {
      ...defaultStyles,
      display: "flex",
    };
  },
  menu: (defaultStyles) => {
    return {
      ...defaultStyles,
      backgroundColor: "#ffffff",
      marginTop: "2px",
      marginLeft: "-10px",
      padding: "12px 10px",
      width: "184px",
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
    };
  },
  option: (defaultStyles, { data }) => {
    return {
      ...defaultStyles,
      backgroundColor: data.color,
      padding: "2px",
      margin: "8px 0px",
      borderRadius: "24px",
      width: "120px",
      textAlign: "center",
      ":hover": {
        opacity: 0.7,
        cursor: "pointer",
      },
    };
  },
};

export const StatusDataView: DataViewerComponent<Cell> = ({ cell }) => {
  const option = useMemo(
    () => cell && statusOptions.find((opt) => opt.value === cell.value),
    [cell]
  );
  return (
    <Select
      unstyled
      styles={colorStyles}
      value={option}
      options={statusOptions}
      isDisabled
    />
  );
};

// TODO: add keyboard nav support
export const StatusDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
  exitEditMode,
}) => {
  const handleChange = useCallback(
    (
      selection:
        | SingleValue<{
            value: string;
            label: string;
          }>
        | undefined
    ) => {
      onChange({ ...cell, value: selection ? selection.value : undefined });
    },
    [cell, onChange]
  );
  const option = useMemo(
    () => cell && statusOptions.find((opt) => opt.value === cell.value),
    [cell]
  );

  return (
    <Select
      unstyled
      styles={colorStyles}
      value={option}
      // @ts-expect-error Neglected meta type
      onChange={handleChange}
      options={statusOptions}
      defaultMenuIsOpen
      onMenuClose={() => {
        exitEditMode();
      }}
    />
  );
};
