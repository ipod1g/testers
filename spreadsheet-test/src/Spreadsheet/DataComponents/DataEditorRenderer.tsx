import { BookmarkDataEdit } from "./BookmarkDataComponents";
import { CalendarDataEdit } from "./CalendarDataComponents";
import { CompanyDataEdit } from "./CompanyDataComponents";
import { EmptyDataEdit } from "./EmptyDataComponents";
import { LinkDataEdit } from "./LinkDataComponents";
import { PositionDataEdit } from "./PositionDataComponents";
import { StatusDataEdit } from "./StatusDataComponents";
import { columnHeaders } from "../config";

import type { DataEditorComponent } from "../../lib/react-spreadsheet";
import type { Cell } from "../types";

const componentMap = {
  empty: EmptyDataEdit,
  bookmark: BookmarkDataEdit,
  company: CompanyDataEdit,
  position: PositionDataEdit,
  appliedDate: CalendarDataEdit,
  linkApply: LinkDataEdit,
  status: StatusDataEdit,
};

export const DataEditorRenderer: DataEditorComponent<Cell> = (props) => {
  const getColumnComponent = (columnName: string) => {
    const Component = componentMap[columnName as keyof typeof componentMap];
    return <Component {...props} />;
  };

  // if indicator is enabled + 1
  const columnIndex = props.column + 1;
  const columnHeader = columnHeaders[columnIndex]?.value;
  // const columnWidth = columnHeaders[columnIndex]?.cellWidth;

  return getColumnComponent(columnHeader);
};
