/**
 * Custom made fast-formula-parser type definitions
 * "@types/fast-formula-parser" is not available anywhere
 */
declare module "fast-formula-parser" {
  export interface CellRef {
    row: number;
    col: number;
    sheet?: string;
    from?: {
      row: number;
      col: number;
    };
    to?: {
      row: number;
      col: number;
    };
  }

  export class DepParser {
    parse: (formula: string, cellRef: CellRef) => Dependency[];
  }

  export class FormulaError {
    static REF: string;
  }

  export interface FormulaParserConfig {
    onCell?: (cellRef: CellRef) => any;
    onRange?: (startRef: CellRef, endRef: CellRef) => any[];
  }

  export type Value = string | number | boolean | null;

  export default class FormulaParser {
    constructor(config?: FormulaParserConfig);
    parse: (formula: string, cellRef: CellRef) => Value | FormulaError;
  }
}
