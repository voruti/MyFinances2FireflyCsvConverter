import { Database } from "sqlite3";
import { writeFile } from "fs";
import { stringify } from "csv-stringify";

// input and output file paths:
const inputFile = "FINANCE_DB";
const outputFile = "output.csv";

// initialize SQLite database:
const db = new Database(inputFile);

const accountQuery = `
  SELECT *
  FROM Account;
`;

interface DbAccount {
    _id?: number;
    Name: string;
    AmountOpen: number | string;
    Balance?: number;
    IsDefault?: number;
    IsChecked?: number;
    IsActive: number;
    DeactivationDate?: string;
    Identifier?: string;
    CreateDate?: string;
    UpdateDate?: string;
    MyFinancesNote?: string;
}

// execute the SQL query:
db.all(accountQuery, [], (err, rows: DbAccount[]) => {
    if (err) {
        console.error("Error reading db:", err.message);
        return;
    }

    // modify the rows:
    const modifiedRecords = rows.map((row) => {
        // convert cents to decimal format:
        row.AmountOpen = (+row.AmountOpen / 100).toFixed(2);

        // remove unused columns:
        delete row.Balance;
        delete row.IsDefault;
        delete row.IsChecked;
        delete row.DeactivationDate;
        delete row.CreateDate;
        delete row.UpdateDate;

        row.MyFinancesNote = `MyFinances-ID: ${row._id}, MyFinances-Identifier: ${row.Identifier}`;
        delete row._id;
        delete row.Identifier;

        return row;
    });

    // convert the modified records to CSV:
    stringify(rows, { delimiter: ",", header: true }, (err, output) => {
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
