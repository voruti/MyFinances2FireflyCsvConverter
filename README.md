# My Finances to Firefly III CSV converter

A converter script that converts CSV exports of the [My Finances app](https://play.google.com/store/apps/details?id=com.sevencsolutions.myfinances) into a different CSV format that can be imported into [Firefly III](https://github.com/firefly-iii/firefly-iii).

## Running

1. Install [Node.js](https://nodejs.org/).
2. Extract a My Finances backup into this directory.
3. Run `node index.js` in a terminal in this directory.

The files `import_config*.json` can be used for the [Data Importer](https://github.com/firefly-iii/data-importer).

## Configuration

- Set the `F2F_LOCALE` environment variable to output in a locale format different from your system (see [Canonical Unicode Locale Identifiers](https://www.unicode.org/reports/tr35/#Canonical_Unicode_Locale_Identifiers) for available options). The `import_config*.json` files are setup for the locale `en-US`.
