import { Database } from "sqlite3";
import { writeFile } from "fs";
import { stringify } from "csv-stringify";

import { convertDbAccountToCsvAccount, type CsvAccount, type DbAccount } from "./model/account";

// input and output file paths:
const inputFile: string = "FINANCE_DB";
const outputFile: string = "output.csv";

// initialize SQLite database:
const db: Database = new Database(inputFile);

// execute the SQL query:
db.all("SELECT * FROM Account;", [], (err, dbAccounts: DbAccount[]) => {
    if (err) {
        console.error("Error reading db:", err.message);
        return;
    }

    // modify the rows:
    const csvAccounts: CsvAccount[] = dbAccounts.map(convertDbAccountToCsvAccount);

    // convert the modified records to CSV:
    stringify(csvAccounts, { delimiter: ",", header: true }, (err, output: string) => {
        if (err) {
            console.error("Error converting to CSV:", err);
            return;
        }

        // write the CSV to the output file:
        writeFile(outputFile, output, "utf8", (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log("Conversion successful. Output written to", outputFile);
            }
        });
    });

    // close the database connection:
    db.close((dbErr) => {
        if (dbErr) {
            console.error("Error closing DB:", dbErr.message);
        }
    });
});
