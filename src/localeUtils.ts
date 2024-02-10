/**
 * Locale to use for all output. Defaults to detecting the system default.
 */
const LOCALE_TO_USE: string | undefined = process.env.F2F_LOCALE;

export function localeFormat(object: number | Date) {
    switch (typeof object) {
        case "number":
            return localeFormatNumber(object);
        case "object":
            if (object instanceof Date) {
                return localeFormatDate(object);
            }
            break;
    }

    throw new Error("There is no locale format implemented for this object");
}

function localeFormatNumber(num: number) {
    return num.toLocaleString(LOCALE_TO_USE, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false
    });
}

function localeFormatDate(date: Date) {
    return date.toLocaleDateString(LOCALE_TO_USE, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}
