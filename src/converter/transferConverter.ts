import { Database } from "sqlite3";
import { writeFile } from "fs";
import { stringify } from "csv-stringify";

import {
    convertDbTransferToCsvTransfer,
    type CsvTransfer,
    type DbTransfer
} from "../model/transfers";

export class TransferConverter {
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

    constructor(private db: Database, private outputFile: string) {}

    public run(): void {
        this.db.all(TransferConverter.QUERY, [], (err, dbTransfers: DbTransfer[]) => {
            if (err) {
                console.error("Error reading db:", err.message);
                return;
            }

            // convert the rows:
            const csvTransfers: CsvTransfer[] = dbTransfers.map(convertDbTransferToCsvTransfer);

            // convert the modified records to CSV:
            stringify(csvTransfers, { delimiter: ",", header: true }, (err, csvString: string) => {
                if (err) {
                    console.error("Error converting to CSV:", err);
                    return;
                }

                // write the CSV to the output file:
                writeFile(this.outputFile, csvString, "utf8", (err) => {
                    if (err) {
                        console.error("Error writing to file:", err);
                    } else {
                        console.log("Conversion successful. Output written to", this.outputFile);
                    }
                });
            });
        });
    }
}
