const fs = require("fs");
const csvParse = require("csv-parse");
const csvStringify = require("csv-stringify");

// input and output file paths:
const inputFile = "input.csv";
const outputFile = "operations_legacy.csv";

// read the CSV file:
fs.readFile(inputFile, "utf8", (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }

    // modify header:
    function modifyHeader(csvString) {
        const lines = csvString.split("\n");
        lines[0] = lines[0]

            // remove spaces from headers:
            .split(/ +/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("")

            // fix duplicate category:
            .replace("CategoryName;CategoryName", "CategoryName;CommonCategoryName");

        return lines.join("\n");
    }
    const fixedCsvString = modifyHeader(data);

    // parse the CSV data:
    csvParse.parse(fixedCsvString, { delimiter: ";", columns: true }, (err, records) => {
        if (err) {
            console.error(`Error parsing CSV: ${err}`);
            return;
        }

        // modify the records:
        const modifiedRecords = records.map((record) => {
            // add sign to amount:
            const sign = record.Type === "1" ? "-" : "+";
            record.Amount = `${sign}${record.Amount}`;

            // remove column Type:
            delete record.Type;

            // add field for opposing account:
            record.OpposingAccount = "Fallback";

            return record;
        });

        // convert the modified records back to CSV:
        csvStringify.stringify(modifiedRecords, { delimiter: ";", header: true }, (err, output) => {
            if (err) {
                console.error(`Error converting to CSV: ${err}`);
                return;
            }

            // write the new CSV to the output file:
            fs.writeFile(outputFile, output, "utf8", (err) => {
                if (err) {
                    console.error(`Error writing to file: ${err}`);
                } else {
                    console.log(`Conversion successful. Output written to ${outputFile}`);
                }
            });
        });
    });
});
