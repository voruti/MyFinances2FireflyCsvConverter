import type { DbEntry } from "./dbEntry";
import type { CsvEntry } from "./csvEntry";

export interface DbTransfer extends DbEntry<"transfer"> {
    _id: number;
    Title: string;
    Amount: number;
    OperationDate: string;
    SourceAccountName: string;
    TargetAccountName: string;
}

export interface CsvTransfer extends CsvEntry<"transfer"> {
    Title: string;
    Amount: string;
    OperationDate: string;
    SourceAccountName: string;
    TargetAccountName: string;
    MyFinancesNote: string;
}
