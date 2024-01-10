import React, { FormEvent, useState } from 'react';
import Spreadsheet from './Spreadsheet';
import { createEmptyMatrix } from './lib/react-spreadsheet';
import type { StringCell } from './Spreadsheet/types';
import { columnHeaders } from './Spreadsheet/config';
import { DataViewerRenderer } from './Spreadsheet/DataComponents/DataViewerRenderer';
import { DataEditorRenderer } from './Spreadsheet/DataComponents/DataEditorRenderer';
import { CompanyDataInputCell } from './Spreadsheet/DataComponents/CompanyDataComponents';

const INITIAL_ROWS = 6;
const INITIAL_COLUMNS = columnHeaders.length - 1;
const EMPTY_DATA = createEmptyMatrix<StringCell>(INITIAL_ROWS, INITIAL_COLUMNS);

const App = () => {
  // fetching data here determines the 'tabs'
  const [data, setData] = useState(EMPTY_DATA);

  interface TemplatedRowInput extends EventTarget {
    company: {
      value: string;
    };
    position: {
      value: string;
    };
    appliedDate: {
      value: string;
    };
    linkApply: {
      value: string;
    };
    status: {
      value: string;
    };
  }

  const addRow = React.useCallback(
    (userInputValues: TemplatedRowInput) =>
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
        return [...data, newRow];
      }),
    [setData]
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addRow(e.target as TemplatedRowInput);
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
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <input id="company" defaultValue={'Google'}></input>
        <input id="position" defaultValue={'Software Engineer'}></input>
        <input id="appliedDate" defaultValue={'17/12/2023'}></input>
        <input id="linkApply"></input>
        <input id="status" defaultValue={'applied'}></input>
        <button className="bg-[#363E36] px-9 py-2 rounded-lg mx-10 text-white">
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
