import { Database } from "sqlite3";
import { writeFile } from "fs";
import { stringify } from "csv-stringify";

import { convertDbAccountToCsvAccount, type CsvAccount, type DbAccount } from "../model/accounts";

export class AccountConverter {
    private static readonly QUERY: string = `
            SELECT
                _id,
                Name,
                AmountOpen,
                DateOpen,
                IsActive
            FROM
                Account;
        `;

    constructor(private db: Database, private outputFile: string) {}

    public run(): void {
        this.db.all(AccountConverter.QUERY, [], (err, dbAccounts: DbAccount[]) => {
            if (err) {
                console.error("Error reading db:", err.message);
                return;
            }

            // convert the rows:
            const csvAccounts: CsvAccount[] = dbAccounts.map(convertDbAccountToCsvAccount);

            // convert the modified records to CSV:
            stringify(csvAccounts, { delimiter: ",", header: true }, (err, csvString: string) => {
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
