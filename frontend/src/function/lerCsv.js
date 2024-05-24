"use strict";
exports.__esModule = true;
var fs = require("fs");
var readline = require("readline");
var csvFilePath = '../../../backend/routes/testeData.csv';
var readInterface = readline.createInterface({
    input: fs.createReadStream(csvFilePath),
    output: process.stdout
});
var lineCount = 1;
readInterface.on('line', function (line) {
    if (lineCount === 0) {
        console.log(line);
    }
    lineCount++;
    if (lineCount > 5000) {
        readInterface.close();
    }
});
