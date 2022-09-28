"use strict";
exports.__esModule = true;
var fs = require("fs");
var data = fs.readFileSync('./data.txt', { encoding: 'utf8', flag: 'r' });
console.log(data.split('\r\n')[0].split(','));
