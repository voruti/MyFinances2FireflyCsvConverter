import type { Database } from "sqlite3";
import { writeFile } from "fs";
import { stringify } from "csv-stringify";

import type { Type } from "../model/type";
import type { DbEntry } from "../model/dbEntry";
import type { CsvEntry } from "../model/csvEntry";

export class GenericConverter<T extends Type, D extends DbEntry<T>, C extends CsvEntry<T>> {
    constructor(
        private db: Database,
        private outputFile: string,
        private query: string,
        private convertingFunction: (dbEntry: D) => C
    ) {}

    public run(): void {
        this.db.all(this.query, [], (err, dbEntries: D[]) => {
            if (err) {
                console.error("Error reading db:", err.message);
                return;
            }

            // convert the rows:
            const csvEntries: C[] = dbEntries.map(this.convertingFunction);

            // convert the modified records to CSV:
            stringify(csvEntries, { delimiter: ",", header: true }, (err, csvString: string) => {
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
