import { useCallback, useState } from "react";

import { HeaderRow } from "./HeaderRow";
import {
  EmptySelection,
  EntireColumnsSelection,
  Spreadsheet as SpreadsheetPrimitive,
} from "../lib/react-spreadsheet";

import type { CellBase, Selection, Props } from "../lib/react-spreadsheet";
import type { ReactElement } from "react";

function Spreadsheet<CellType extends CellBase>(
  props: Props<CellType>
): ReactElement {
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
      // eslint-disable-next-line react/no-unstable-nested-components -- passing component props
      HeaderRow={() => (
        <HeaderRow handleSelectEntireColumn={handleSelectEntireColumn} />
      )}
      onSelect={handleSelect}
      selected={selected}
      {...props}
    />
  );
}

Spreadsheet.displayName = "Spreadsheet";

export { Spreadsheet };
