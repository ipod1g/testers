/* eslint-disable jsx-a11y/mouse-events-have-key-events -- extracted from lib */
import classnames from "classnames";
import * as React from "react";

import { columnHeaders } from "./config";
import * as Actions from "../lib/react-spreadsheet/actions";
import * as Matrix from "../lib/react-spreadsheet/matrix";
import useDispatch from "../lib/react-spreadsheet/use-dispatch";
import useSelector from "../lib/react-spreadsheet/use-selector";
import { isActive, getOffsetRect } from "../lib/react-spreadsheet/util";

import type * as Point from "../lib/react-spreadsheet/point";
import type * as Types from "../lib/react-spreadsheet/types";

export const CustomCell: React.FC<
  Types.CellComponentProps & {
    edit: () => void;
  }
> = ({
  row,
  column,
  DataViewer,
  selected,
  active,
  dragging,
  mode,
  data,
  evaluatedData,
  select,
  activate,
  setCellDimensions,
  setCellData,
}): React.ReactElement => {
  const rootRef = React.useRef<HTMLTableCellElement | null>(null);
  const point = React.useMemo(
    (): Point.Point => ({
      row,
      column,
    }),
    [row, column]
  );

  const handleMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLTableCellElement>) => {
      if (mode === "view") {
        setCellDimensions(point, getOffsetRect(event.currentTarget));

        if (event.shiftKey) {
          select(point);
        } else if (
          point.column ===
            columnHeaders.findIndex((header) => header.value === "linkApply") -
              1 &&
          data?.value
        ) {
          // magic number for delaying the click
          setTimeout(() => {
            activate(point);
          }, 70);
        } else {
          activate(point);
        }
      }
    },
    [mode, setCellDimensions, point, data?.value, select, activate]
  );

  const handleMouseOver = React.useCallback(
    (event: React.MouseEvent<HTMLTableCellElement>) => {
      if (dragging) {
        setCellDimensions(point, getOffsetRect(event.currentTarget));
        select(point);
      }
    },
    [setCellDimensions, select, dragging, point]
  );

  React.useEffect(() => {
    const root = rootRef.current;
    if (selected && root) {
      setCellDimensions(point, getOffsetRect(root));
    }
    if (root && active && mode === "view") {
      root.focus();
    }
  }, [setCellDimensions, selected, active, mode, point, data]);

  if (data?.DataViewer) {
    // eslint-disable-next-line no-param-reassign -- from lib
    DataViewer = data.DataViewer;
  }

  return (
    <td
      className={classnames(`Spreadsheet__cell max-w-[${columnHeaders[column].cellWidth}]`, data?.className, {
        "Spreadsheet__cell--readonly": data?.readOnly,
      })}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
      ref={rootRef}
      tabIndex={0}
    >
      <DataViewer
        cell={data}
        column={column}
        evaluatedCell={evaluatedData}
        row={row}
        setCellData={setCellData}
      />
    </td>
  );
};

// eslint-disable-next-line react-refresh/only-export-components -- from lib
export const enhance = (
  CellComponent: React.ComponentType<
    Types.CellComponentProps & {
      edit: () => void;
    }
  >
): React.FC<
  Omit<
    Types.CellComponentProps,
    | "selected"
    | "active"
    | "copied"
    | "dragging"
    | "mode"
    | "data"
    | "select"
    | "activate"
    | "setCellDimensions"
  >
> => {
  return function CellWrapper(props) {
    const { row, column } = props;
    const dispatch = useDispatch();
    const cellPoint = React.useMemo(
      (): Point.Point => ({
        row,
        column,
      }),
      [row, column]
    );
    const setCellData = React.useCallback(
      (data: Types.CellBase) => {
        dispatch(Actions.setCellData(cellPoint, data));
      },
      [dispatch, cellPoint]
    );
    const select = React.useCallback(
      (point: Point.Point) => {
        dispatch(Actions.select(point));
      },
      [dispatch]
    );
    const activate = React.useCallback(
      (point: Point.Point) => {
        dispatch(Actions.activate(point));
      },
      [dispatch]
    );
    const setCellDimensions = React.useCallback(
      (point: Point.Point, dimensions: Types.Dimensions) => {
        dispatch(Actions.setCellDimensions(point, dimensions));
      },
      [dispatch]
    );

    const edit = React.useCallback(() => {
      dispatch(Actions.edit());
    }, [dispatch]);

    const active = useSelector((state) => isActive(state.active, cellPoint));
    const mode = useSelector((state) => (active ? state.mode : "view"));
    const data = useSelector((state) =>
      Matrix.get(cellPoint, state.model.data)
    );
    const evaluatedData = useSelector((state) =>
      Matrix.get(cellPoint, state.model.evaluatedData)
    );

    const selected = useSelector((state) =>
      state.selected.has(state.model.data, cellPoint)
    );
    const dragging = useSelector((state) => state.dragging);
    const copied = useSelector(
      (state) => state.copied?.has(cellPoint) || false
    );

    return (
      <CellComponent
        {...props}
        activate={activate}
        active={active}
        copied={copied}
        data={data}
        dragging={dragging}
        edit={edit}
        evaluatedData={evaluatedData}
        mode={mode}
        select={select}
        selected={selected}
        setCellData={setCellData}
        setCellDimensions={setCellDimensions}
      />
    );
  };
};
