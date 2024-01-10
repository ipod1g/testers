import * as React from 'react';
import type {
  DataEditorComponent,
  DataViewerComponent,
} from 'react-spreadsheet';
import type { Cell } from '../types';
import { BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons';

export const BookmarkDataView: DataViewerComponent<Cell> = ({ cell }) => {
  return cell?.value === 'bookmarked' ? (
    <BookmarkFilledIcon width={20} height={20} className="mx-auto" />
  ) : (
    <BookmarkIcon width={20} height={20} className="mx-auto" />
  );
};

export const BookmarkDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
}) => {
  const handleChange = React.useCallback(() => {
    if (cell?.value === 'bookmarked') {
      // can use a more definitive string too
      onChange({ ...cell, value: '' });
    } else {
      onChange({ ...cell, value: 'bookmarked' });
    }
  }, [cell, onChange]);

  return (
    <button onClick={handleChange} className="w-full h-full">
      {cell?.value === 'bookmarked' ? (
        <BookmarkFilledIcon width={20} height={20} className="mx-auto" />
      ) : (
        <BookmarkIcon width={20} height={20} className="mx-auto" />
      )}
    </button>
  );
};
