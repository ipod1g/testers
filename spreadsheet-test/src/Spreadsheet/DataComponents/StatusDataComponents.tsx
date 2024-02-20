import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, withStyles } from "@material-ui/core/styles";
import { KeyboardArrowDown } from "@material-ui/icons";
import { useCallback, useMemo } from "react";

import { columnHeaders, statusOptions } from "../config";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";
import type { Theme } from "@material-ui/core/styles";
import type { ChangeEvent, ReactNode } from "react";

const StyledInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      fontSize: 16,
      width: "100%",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

export const StatusDataView: DataViewerComponent<Cell> = ({ cell }) => {
  const option = useMemo(
    () =>
      statusOptions.find((opt) => opt.value === cell?.value) ||
      statusOptions[0],
    [cell]
  );

  return (
    <div className="flex justify-between">
      <div
        className={`flex-grow-0 rounded-full px-[14px] py-[3px] text-center ${
          option.value !== "" ? "font-medium" : ""
        }`}
        style={{
          backgroundColor: option.bgColor,
          color: option.textColor,
        }}
      >
        {option.label}
      </div>
      <div>
        <KeyboardArrowDown style={{ fontSize: "16px" }} />
      </div>
    </div>
  );
};

//TODO: fix anchor element
export const StatusDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
  exitEditMode,
}) => {
  const handleChange = useCallback(
    (
      event: ChangeEvent<{
        name?: string | undefined;
        value: unknown;
      }>,
      _child: ReactNode
    ) => {
      onChange({ ...cell, value: event.target.value as string });
      exitEditMode();
    },
    [cell, exitEditMode, onChange]
  );
  const option = useMemo(
    () => cell && statusOptions.find((opt) => opt.value === cell.value),
    [cell]
  );

  return (
    <Select
      // eslint-disable-next-line react/no-unstable-nested-components -- eslint bypass
      IconComponent={() => <KeyboardArrowDown style={{ fontSize: "16px" }} />}
      MenuProps={{
        open: true,
        disablePortal: true,
        autoFocus: true,
        elevation: 0,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        getContentAnchorEl: null,
        PaperProps: {
          style: {
            border: "2px solid #E4E4E4",
            borderRadius: "3px",
            marginLeft: "-10px",
            padding: "12px 0px",
            width:
              columnHeaders.find((header) => header.value === "status")
                ?.cellWidth || "164px",
            backgroundColor: "#ffffff",
          },
        },
      }}
      defaultValue=""
      id="customized-select"
      input={<StyledInput />}
      labelId="customized-select-label"
      onChange={handleChange}
      onClose={() => {
        exitEditMode();
      }}
      renderValue={(_val) => {
        return (
          <div className="flex">
            <div
              className="flex-grow-0 rounded-full px-[14px] py-[3px] text-center"
              style={{
                backgroundColor: option?.bgColor,
                color: option?.textColor,
              }}
            >
              {option?.label}
            </div>
          </div>
        );
      }}
      value={option?.value || ""}
    >
      {statusOptions.map((opt, idx) =>
        opt.value !== "" ? (
          // eslint-disable-next-line react/no-array-index-key -- status is duplicate
          <MenuItem className="" key={`${opt.value}-${idx}`} value={opt.value}>
            <div
              className="rounded-full px-[14px] py-[3px] text-center"
              style={{ backgroundColor: opt.bgColor, color: opt.textColor }}
            >
              {opt.label}
            </div>
          </MenuItem>
        ) : null
      )}
    </Select>
  );
};
