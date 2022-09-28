import * as fs from 'fs';

let data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});
console.log(data.split('\r\n')[0].split(','))
