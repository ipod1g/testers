import { Bookmark, BookmarkBorder } from "@material-ui/icons";
import { useCallback } from "react";

import type {
  DataEditorComponent,
  DataViewerComponent,
} from "../../lib/react-spreadsheet";
import type { Cell } from "../types";

export const BookmarkDataView: DataViewerComponent<Cell> = ({ cell }) => {
  return cell?.value === "bookmarked" ? (
    <div className="w-full h-full flex justify-center items-center">
      <Bookmark height={20} width={20} />
    </div>
  ) : (
    <div className="w-full h-full flex justify-center items-center">
      <BookmarkBorder height={20} width={20} />
    </div>
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
    <button
      autoFocus
      className="w-full h-full"
      onFocus={() => {
        handleChange();
      }}
      type="button"
    >
      {cell?.value === "bookmarked" ? (
        <Bookmark className="mx-auto" height={20} width={20} />
      ) : (
        <BookmarkBorder className="mx-auto" height={20} width={20} />
      )}
    </button>
  );
};
