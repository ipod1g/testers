import type { Cell } from '../types';
import type { DataViewerComponent } from 'react-spreadsheet';
import { CompanyDataView } from './CompanyDataComponents';
import { StatusDataView } from './StatusDataComponents';
import { PositionDataView } from './PositionDataComponents';
import { LinkDataView } from './LinkDataComponents';
import { DateDataView } from './DateDataComponents';
import { columnHeaders } from '../config';
import { EmptyDataView } from './EmptyDataComponents';
import { BookmarkDataView } from './BookmarkDataComponents';

const componentMap = {
  empty: EmptyDataView,
  bookmark: BookmarkDataView,
  company: CompanyDataView,
  position: PositionDataView,
  appliedDate: DateDataView,
  linkApply: LinkDataView,
  status: StatusDataView,
};

export const DataViewerRenderer: DataViewerComponent<Cell> = (props) => {
  const getColumnComponent = (columnName: string) => {
    const Component = componentMap[columnName as keyof typeof componentMap] || (
      <td>{props.cell?.value}</td> // fallback
    );
    return <Component {...props} />;
  };

  // if indicator is enabled + 1
  const columnIndex = props.column + 1;
  const columnHeader = columnHeaders[columnIndex]?.value;
  // const columnWidth = columnHeaders[columnIndex]?.cellWidth;

  return getColumnComponent(columnHeader);
};
