import type { Database } from "sqlite3";

import type { CsvTransfer, DbTransfer } from "../model/transfer";
import { GenericConverter } from "./genericConverter";
import { localeFormat } from "../localeUtils";

export class TransferConverter extends GenericConverter<"transfer", DbTransfer, CsvTransfer> {
    private static readonly QUERY: string = `
            SELECT
                t._id,
                t.Title,
                t.Amount,
                t.OperationDate,
                accsrc.Name AS SourceAccountName,
                acctrg.Name AS TargetAccountName
            FROM
                Transfer t
                LEFT JOIN Account accsrc ON t.SourceAccountId = accsrc._id
                LEFT JOIN Account acctrg ON t.TargetAccountId = acctrg._id;
        `;

    constructor(db: Database) {
        super(
            db,
            "transfers.csv",
            TransferConverter.QUERY,
            TransferConverter.convertDbTransferToCsvTransfer
        );
    }

    private static convertDbTransferToCsvTransfer(db: DbTransfer): CsvTransfer {
        return {
            Title: db.Title,
            Amount: localeFormat(db.Amount / 100),
            OperationDate: localeFormat(new Date(db.OperationDate)),
            SourceAccountName: db.SourceAccountName,
            TargetAccountName: db.TargetAccountName,
            MyFinancesNote: `MyFinances-ID: ${db._id}`
        };
    }
}
