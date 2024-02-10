export interface DbAccount {
    _id: number;
    Name: string;
    AmountOpen: number;
    DateOpen: string;
    IsActive: number;
}

export function convertDbAccountToCsvAccount(db: DbAccount): CsvAccount {
    return {
        Name: db.Name,
        AmountOpen: (db.AmountOpen / 100).toFixed(2),
        DateOpen: db.DateOpen,
        IsActive: db.IsActive,
        MyFinancesNote: `MyFinances-ID: ${db._id}`
    };
}

export interface CsvAccount {
    Name: string;
    AmountOpen: string;
    DateOpen: string;
    IsActive: number;
    MyFinancesNote: string;
}
