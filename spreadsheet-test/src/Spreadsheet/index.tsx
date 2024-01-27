import { useCallback, useState } from "react";

import { CustomCell } from "./CustomCell";
import { DataEditorRenderer } from "./DataComponents/DataEditorRenderer";
import { DataViewerRenderer } from "./DataComponents/DataViewerRenderer";
import { HeaderRow } from "./HeaderRow";
import {
  EmptySelection,
  EntireColumnsSelection,
  Spreadsheet as SpreadsheetPrimitive,
} from "../lib/react-spreadsheet";

import type { CellBase, Selection, Props } from "../lib/react-spreadsheet";
import type { ReactElement } from "react";

const Spreadsheet = (
  props: Omit<
    Props<CellBase>,
    "Cell" | "DataEditor" | "DataViewer" | "HeaderRow"
  >
): ReactElement => {
  const [selected, setSelected] = useState<Selection | undefined>(
    new EmptySelection()
  );

  const handleSelect = useCallback((selection: Selection) => {
    setSelected(selection);
  }, []);

  const handleSelectEntireColumn = useCallback((index: number) => {
    setSelected(new EntireColumnsSelection(index, index));
  }, []);

  return (
    <SpreadsheetPrimitive
      // @ts-expect-error -- custom cell
      Cell={CustomCell}
      DataEditor={DataEditorRenderer}
      DataViewer={DataViewerRenderer}
      // eslint-disable-next-line react/no-unstable-nested-components -- passing component props
      HeaderRow={() => (
        <HeaderRow handleSelectEntireColumn={handleSelectEntireColumn} />
      )}
      onSelect={handleSelect}
      selected={selected}
      {...props}
    />
  );
};

Spreadsheet.displayName = "Spreadsheet";

export { Spreadsheet };
