export interface DbTransfer {
    _id: number;
    Title: string;
    Amount: number;
    OperationDate: string;
    SourceAccountName: string;
    TargetAccountName: string;
}

export function convertDbTransferToCsvTransfer(db: DbTransfer): CsvTransfer {
    return {
        Title: db.Title,
        Amount: (db.Amount / 100).toFixed(2),
        OperationDate: db.OperationDate,
        SourceAccountName: db.SourceAccountName,
        TargetAccountName: db.TargetAccountName,
        MyFinancesNote: `MyFinances-ID: ${db._id}`
    };
}

export interface CsvTransfer {
    Title: string;
    Amount: string;
    OperationDate: string;
    SourceAccountName: string;
    TargetAccountName: string;
    MyFinancesNote: string;
}
