const sqlite3 = require("sqlite3");
const fs = require("fs");
const csvStringify = require("csv-stringify");

// input and output file paths:
const inputFile = "FINANCE_DB";
const outputFile = "output.csv";

// initialize SQLite database:
const db = new sqlite3.Database(inputFile);

const accountQuery = `
  SELECT *
  FROM Account;
`;

// execute the SQL query:
db.all(accountQuery, [], (err, rows) => {
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
        delete row.UpdateDate;
        delete row.CreateDate;

        row.MyFinancesNote = `MyFinances-ID: ${row._id}, MyFinances-Identifier: ${row.Identifier}`;
        delete row._id;
        delete row.Identifier;

        return row;
    });

    // convert the modified records to CSV:
    csvStringify.stringify(rows, { delimiter: ",", header: true }, (err, output) => {
        if (err) {
            console.error("Error converting to CSV:", err);
            return;
        }

        // write the CSV to the output file:
        fs.writeFile(outputFile, output, "utf8", (err) => {
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
