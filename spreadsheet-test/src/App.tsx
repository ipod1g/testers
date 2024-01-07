import React, { FormEvent, useState } from 'react';
import Spreadsheet from './Spreadsheet';
import { createEmptyMatrix } from './lib/react-spreadsheet';
import type { StringCell } from './Spreadsheet/types';
import { columnHeaders } from './Spreadsheet/config';
import { DataViewerRenderer } from './Spreadsheet/DataComponents/DataViewerRenderer';
import { DataEditorRenderer } from './Spreadsheet/DataComponents/DataEditorRenderer';

const INITIAL_ROWS = 6;
const INITIAL_COLUMNS = columnHeaders.length - 1;
const EMPTY_DATA = createEmptyMatrix<StringCell>(INITIAL_ROWS, INITIAL_COLUMNS);

const App = () => {
  // fetching data here determines the 'tabs'
  const [data, setData] = useState(EMPTY_DATA);
  const addRow = React.useCallback(
    (userInputValues: EventTarget) =>
      setData((data) => {
        const newRow = [
          {
            value: '',
          },
          {
            value: userInputValues.company.value,
          },
          {
            value: userInputValues.position.value,
          },
          {
            value: userInputValues.appliedDate.value,
          },
          {
            value: userInputValues.linkApply.value,
          },
          {
            value: userInputValues.status.value,
          },
        ];
        console.log([...data, newRow]);

        return [...data, newRow];
      }),
    [setData]
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addRow(e.target);
  }

  return (
    <div>
      <Spreadsheet
        DataViewer={DataViewerRenderer}
        DataEditor={DataEditorRenderer}
        data={data}
        onChange={setData}
        // hideRowIndicators
      />
      <form onSubmit={handleSubmit}>
        <input id="company" defaultValue={'Google'}></input>
        <input id="position" defaultValue={'Software Engineer'}></input>
        <input id="appliedDate" defaultValue={'17/12/2023'}></input>
        <input id="linkApply"></input>
        <input id="status" defaultValue={'applied'}></input>
        <button className="fixed bottom-0 h-40 bg-white">add</button>
      </form>
    </div>
  );
};

export default App;
