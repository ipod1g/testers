import type { Cell } from '../types';
import type { DataViewerComponent } from '../../lib/react-spreadsheet';
import { CompanyDataView } from './CompanyDataComponents';
import { StatusDataView } from './StatusDataComponents';
import { PositionDataView } from './PositionDataComponents';
import { LinkDataView } from './LinkDataComponents';
import { DateDataView } from './DateDataComponents';
import { columnHeaders } from '../config';
import { EmptyDataView } from './EmptyDataComponents';
import { BookmarkDataEdit } from './BookmarkDataComponents';

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

const FallbackDataView: DataViewerComponent<Cell> = ({ cell }) => {
  return <td>{cell?.value}</td>;
};

export const DataViewerRenderer: DataViewerComponent<Cell> = (props) => {
  const getColumnComponent = (columnName: string) => {
    const Component =
      componentMap[columnName as keyof typeof componentMap] || FallbackDataView; // fallback
    // @ts-expect-error TODO: Bookmark type to be fixed
    return <Component {...props} />;
  };

  // if indicator is enabled + 1
  const columnIndex = props.column + 1;
  const columnHeader = columnHeaders[columnIndex]?.value;
  // const columnWidth = columnHeaders[columnIndex]?.cellWidth;

  return getColumnComponent(columnHeader);
};
