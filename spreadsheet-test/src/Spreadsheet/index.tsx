import React, { useState } from 'react';
import {
  EmptySelection,
  EntireColumnsSelection,
  Spreadsheet as SpreadsheetPrimitive,
  createEmptyMatrix,
} from 'react-spreadsheet';
import type { Selection } from 'react-spreadsheet';
import { DataViewerRenderer } from './DataComponents/DataViewerRenderer';
import HeaderRow from './HeaderRow';
import { DataEditorRenderer } from './DataComponents/DataEditorRenderer';
import type { StringCell } from './types';
import { columnHeaders } from './config';
// import * as Matrix from './matrix';

const INITIAL_ROWS = 6;
const INITIAL_COLUMNS = columnHeaders.length - 1;
const EMPTY_DATA = createEmptyMatrix<StringCell>(INITIAL_ROWS, INITIAL_COLUMNS);

export default function Spreadsheet() {
  // fetching data here determines the 'tabs'

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(EMPTY_DATA);

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
      DataViewer={DataViewerRenderer}
      DataEditor={DataEditorRenderer}
      HeaderRow={() => (
        <HeaderRow handleSelectEntireColumn={handleSelectEntireColumn} />
      )}
      data={data}
      // hideRowIndicators
    />
  );
}
