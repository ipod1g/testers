import type { Cell } from '../types';
import type { DataEditorComponent } from '../../lib/react-spreadsheet';
import { CompanyDataEdit } from './CompanyDataComponents';
import { StatusDataEdit } from './StatusDataComponents';
import { PositionDataEdit } from './PositionDataComponents';
import { LinkDataEdit } from './LinkDataComponents';
import { DateDataEdit } from './DateDataComponents';
import { columnHeaders } from '../config';
import { EmptyDataEdit } from './EmptyDataComponents';
import { BookmarkDataEdit } from './BookmarkDataComponents';

const componentMap = {
  empty: EmptyDataEdit,
  bookmark: BookmarkDataEdit,
  company: CompanyDataEdit,
  position: PositionDataEdit,
  appliedDate: DateDataEdit,
  linkApply: LinkDataEdit,
  status: StatusDataEdit,
};

const FallbackDataEdit: DataEditorComponent<Cell> = ({ cell }) => {
  return <td>{cell?.value}</td>;
};

export const DataEditorRenderer: DataEditorComponent<Cell> = (props) => {
  const getColumnComponent = (columnName: string) => {
    const Component =
      componentMap[columnName as keyof typeof componentMap] || FallbackDataEdit;
    return <Component {...props} />;
  };

  // if indicator is enabled + 1
  const columnIndex = props.column + 1;
  const columnHeader = columnHeaders[columnIndex]?.value;
  // const columnWidth = columnHeaders[columnIndex]?.cellWidth;

  return getColumnComponent(columnHeader);
};
