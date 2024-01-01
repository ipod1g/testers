import { CellBase } from 'react-spreadsheet';

export type Value = string | undefined;

export type Cell = CellBase<Value> & {
  value: Value;
};

export type StringCell = CellBase<string | undefined>;
