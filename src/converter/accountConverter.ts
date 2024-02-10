import type { Database } from "sqlite3";

import type { CsvAccount, DbAccount } from "../model/account";
import { GenericConverter } from "./genericConverter";

export class AccountConverter extends GenericConverter<"account", DbAccount, CsvAccount> {
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

    constructor(db: Database) {
        super(
            db,
            "accounts.csv",
            AccountConverter.QUERY,
            AccountConverter.convertDbAccountToCsvAccount
        );
    }

    private static convertDbAccountToCsvAccount(db: DbAccount): CsvAccount {
        return {
            Name: db.Name,
            AmountOpen: (db.AmountOpen / 100).toFixed(2),
            DateOpen: new Date(db.DateOpen).toLocaleDateString(undefined, { dateStyle: "medium" }),
            IsActive: db.IsActive,
            MyFinancesNote: `MyFinances-ID: ${db._id}`
        };
    }
}
