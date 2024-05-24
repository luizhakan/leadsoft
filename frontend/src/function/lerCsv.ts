import * as fs from 'fs';
import * as readline from 'readline';

const csvFilePath = '../../final_animedataset.csv';

const readInterface = readline.createInterface({
    input: fs.createReadStream(csvFilePath),
    output: process.stdout,
});

let lineCount = 1;
readInterface.on('line', function(line) {
    if (lineCount === 0) {
        console.log(line);
    }
    lineCount++;
    if (lineCount > 5000) {
        readInterface.close();
    }
});
