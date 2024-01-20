import { BookmarkDataEdit } from "./BookmarkDataComponents";
import { CompanyDataView } from "./CompanyDataComponents";
import { DateDataView } from "./DateDataComponents";
import { EmptyDataView } from "./EmptyDataComponents";
import { LinkDataView } from "./LinkDataComponents";
import { PositionDataView } from "./PositionDataComponents";
import { StatusDataView } from "./StatusDataComponents";
import { columnHeaders } from "../config";

import type { DataViewerComponent } from "../../lib/react-spreadsheet";
import type { Cell } from "../types";

const componentMap = {
  empty: EmptyDataView,
  bookmark: BookmarkDataEdit,
  // bookmark: BookmarkDataView,
  company: CompanyDataView,
  position: PositionDataView,
  appliedDate: DateDataView,
  linkApply: LinkDataView,
  status: StatusDataView,
};

export const DataViewerRenderer: DataViewerComponent<Cell> = (props) => {
  const getColumnComponent = (columnName: string) => {
    const Component = componentMap[columnName as keyof typeof componentMap];
    // @ts-expect-error TODO: Bookmark type to be fixed
    return <Component {...props} />;
  };

  // if indicator is enabled + 1
  const columnIndex = props.column + 1;
  const columnHeader = columnHeaders[columnIndex]?.value;
  // const columnWidth = columnHeaders[columnIndex]?.cellWidth;

  return getColumnComponent(columnHeader);
};
