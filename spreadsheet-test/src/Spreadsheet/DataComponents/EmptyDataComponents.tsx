import type { Cell } from '../types';
import type {
  DataEditorComponent,
  DataViewerComponent,
} from 'react-spreadsheet';

export const EmptyDataView: DataViewerComponent<Cell> = () => {
  return <span className="w-full"></span>;
};

export const EmptyDataEdit: DataEditorComponent<Cell> = () => {
  return <span className="w-full"></span>;
};
