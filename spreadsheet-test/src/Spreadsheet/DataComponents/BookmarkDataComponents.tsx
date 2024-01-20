import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { useCallback } from "react";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";

export const BookmarkDataView: DataViewerComponent<Cell> = ({ cell }) => {
  return cell?.value === "bookmarked" ? (
    <Bookmark width={20} height={20} className="mx-auto" />
  ) : (
    <BookmarkBorder width={20} height={20} className="mx-auto" />
  );
};

export const BookmarkDataEdit: DataEditorComponent<Cell> = ({
  cell,
  onChange,
}) => {
  const handleChange = useCallback(() => {
    if (cell?.value === "bookmarked") {
      // can use a more definitive string too
      onChange({ ...cell, value: "" });
    } else {
      onChange({ ...cell, value: "bookmarked" });
    }
  }, [cell, onChange]);

  return (
    <button onClick={handleChange} className="w-full h-full">
      {cell?.value === "bookmarked" ? (
        <Bookmark width={20} height={20} className="mx-auto" />
      ) : (
        <BookmarkBorder width={20} height={20} className="mx-auto" />
      )}
    </button>
  );
};
