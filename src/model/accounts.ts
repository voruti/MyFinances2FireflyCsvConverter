export interface DbAccount {
    _id: number;
    Name: string;
    AmountOpen: number;
    DateOpen: string;
    IsActive: number;
}

export function convertDbAccountToCsvAccount(dbAccount: DbAccount): CsvAccount {
    return {
        Name: dbAccount.Name,
        AmountOpen: (dbAccount.AmountOpen / 100).toFixed(2),
        DateOpen: dbAccount.DateOpen,
        IsActive: dbAccount.IsActive,
        MyFinancesNote: `MyFinances-ID: ${dbAccount._id}`
    };
}

export interface CsvAccount {
    Name: string;
    AmountOpen: string;
    DateOpen: string;
    IsActive: number;
    MyFinancesNote: string;
}
