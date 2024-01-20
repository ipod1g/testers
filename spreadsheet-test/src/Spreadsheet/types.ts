import type { CellBase } from "../lib/react-spreadsheet";

export type Value = string | undefined;

export type Cell = CellBase<Value> & {
  value: Value;
};

export type StringCell = CellBase<string | undefined>;

export interface SortingState {
  id?: string;
  direction: "none" | "asc" | "desc";
}
