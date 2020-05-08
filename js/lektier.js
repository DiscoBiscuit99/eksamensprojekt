const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('lektier.txt'),
    output: process.stdout,
    console: false
});

// TODO: this can be iterated over with a loop. *

let row = document.createElement('tr');

let column1 = document.createElement('th');
let column2 = document.createElement('th');
let column3 = document.createElement('th');
let column4 = document.createElement('th');
let column5 = document.createElement('th');
let column6 = document.createElement('th');
let column7 = document.createElement('th');

let content1 = document.createTextNode("Dato");
let content2 = document.createTextNode("Ugedag");
let content3 = document.createTextNode("Fag");
let content4 = document.createTextNode("Lektier");
let content5 = document.createTextNode("Øvrigt materiale");
let content6 = document.createTextNode("Links");
let content7 = document.createTextNode("Dokumenter");

column1.appendChild(content1);
column2.appendChild(content2);
column3.appendChild(content3);
column4.appendChild(content4);
column5.appendChild(content5);
column6.appendChild(content6);
column7.appendChild(content7);

row.appendChild(column1);
row.appendChild(column2);
row.appendChild(column3);
row.appendChild(column4);
row.appendChild(column5);
row.appendChild(column6);
row.appendChild(column7);

// *

let table = document.getElementById('lektietabel');

table.appendChild(row)

let i = 1;
readInterface.on('line', (line) => {
    if (i % 7 == 0) {
        let column = document.createElement('td');

        let content = document.createTextNode(line);

        column.appendChild(content);
        row.appendChild(column);

        document.getElementById('lektietabel').appendChild(row);
    } else if (i % 6 == 0) {
        let column = document.createElement('td');

        let content = document.createTextNode(line);

        column.appendChild(content);
        row.appendChild(column);

        document.getElementById('lektietabel').appendChild(row);
    } else if (i % 5 == 0) {
        let column = document.createElement('td');

        let content = document.createTextNode(line);

        column.appendChild(content);
        row.appendChild(column);

        document.getElementById('lektietabel').appendChild(row);
    } else if (i % 4 == 0) {
        let column = document.createElement('td');

        let content = document.createTextNode(line);

        column.appendChild(content);
        row.appendChild(column);

        document.getElementById('lektietabel').appendChild(row);
    } else if (i % 3 == 0) {
        let column = document.createElement('td');

        let content = document.createTextNode(line);

        column.appendChild(content);
        row.appendChild(column);

        document.getElementById('lektietabel').appendChild(row);
    } else if (i % 2 == 0) {
        let column = document.createElement('td');

        let content = document.createTextNode(line);

        column.appendChild(content);
        row.appendChild(column);

        document.getElementById('lektietabel').appendChild(row);
    } else {
        row = document.createElement('tr');

        let column = document.createElement('td');

        let content = document.createTextNode(line);

        column.appendChild(content);
        row.appendChild(column);

        document.getElementById('lektietabel').appendChild(row);
    }
    i++;
});
