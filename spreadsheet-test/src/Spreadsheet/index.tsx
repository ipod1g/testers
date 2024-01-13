import React from 'react';
import {
  EmptySelection,
  EntireColumnsSelection,
  Spreadsheet as SpreadsheetPrimitive,
} from '../lib/react-spreadsheet';
import type { CellBase, Selection, Props } from '../lib/react-spreadsheet';
import HeaderRow from './HeaderRow';

const Spreadsheet = <CellType extends CellBase>(
  props: Props<CellType>
): React.ReactElement => {
  const [selected, setSelected] = React.useState<Selection | undefined>(
    new EmptySelection()
  );

  const handleSelect = React.useCallback((selection: Selection) => {
    setSelected(selection);
  }, []);

  const handleSelectEntireColumn = React.useCallback(
    (index: number) => setSelected(new EntireColumnsSelection(index, index)),
    []
  );

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

export default Spreadsheet;
