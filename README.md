# My Finances to Firefly III CSV converter

A converter script that converts CSV exports of the [My Finances app](https://play.google.com/store/apps/details?id=com.sevencsolutions.myfinances) into a different CSV format that can be imported into [Firefly III](https://github.com/firefly-iii/firefly-iii).

## Running

1. Install [Node.js](https://nodejs.org/).
2. Put the CSV from My Finances into this directory as `input.csv`.
3. Run `node index.js` in a terminal in this directory.

The file `import_config.json` can be used for the [Data Importer](https://github.com/firefly-iii/data-importer).
