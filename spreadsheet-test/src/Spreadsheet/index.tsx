import React, { useCallback, useState } from "react";

import { HeaderRow } from "./HeaderRow";
import {
  EmptySelection,
  EntireColumnsSelection,
  Spreadsheet as SpreadsheetPrimitive,
} from "../lib/react-spreadsheet";

import type { CellBase, Selection, Props } from "../lib/react-spreadsheet";

const Spreadsheet = <CellType extends CellBase>(
  props: Props<CellType>
): React.ReactElement => {
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
      selected={selected}
      onSelect={handleSelect}
      HeaderRow={() => (
        <HeaderRow handleSelectEntireColumn={handleSelectEntireColumn} />
      )}
      {...props}
    />
  );
};

Spreadsheet.displayName = "Spreadsheet";

export { Spreadsheet };
