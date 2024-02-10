import { Database } from "sqlite3";

import { AccountConverter } from "./converter/accountConverter";
import { TransferConverter } from "./converter/transferConverter";

// input file path:
const inputFile: string = "FINANCE_DB";

// initialize SQLite database:
const db: Database = new Database(inputFile);

new AccountConverter(db).run();
new TransferConverter(db).run();

// close the database connection:
db.close((err) => {
    if (err) {
        console.error("Error closing DB:", err.message);
    }
});
