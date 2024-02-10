import type { CsvEntry } from "./csvEntry";
import type { DbEntry } from "./dbEntry";

export interface DbAccount extends DbEntry<"account"> {
    _id: number;
    Name: string;
    AmountOpen: number;
    DateOpen: string;
    IsActive: number;
}

export interface CsvAccount extends CsvEntry<"account"> {
    Name: string;
    AmountOpen: string;
    DateOpen: string;
    IsActive: number;
    MyFinancesNote: string;
}
