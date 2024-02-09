export interface DbAccount {
    _id: number;
    Name: string;
    AmountOpen: number;
    DateOpen: string;
    Balance: number;
    IsDefault: number;
    IsChecked: number;
    IsActive: number;
    DeactivationDate: string;
    Identifier: string;
    CreateDate: string;
    UpdateDate: string;
}

export function convertDbAccountToCsvAccount(dbAccount: DbAccount): CsvAccount {
    return {
        Name: dbAccount.Name,
        AmountOpen: (dbAccount.AmountOpen / 100).toFixed(2),
        DateOpen: dbAccount.DateOpen,
        IsActive: dbAccount.IsActive,
        MyFinancesNote: `MyFinances-ID: ${dbAccount._id}, MyFinances-Identifier: ${dbAccount.Identifier}`
    };
}

export interface CsvAccount {
    Name: string;
    AmountOpen: string;
    DateOpen: string;
    IsActive: number;
    MyFinancesNote: string;
}
