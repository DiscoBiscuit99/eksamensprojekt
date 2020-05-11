const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('afleveringer.txt'),
    output: process.stdout,
    console: false
});

let row = document.createElement('tr');

let column1 = document.createElement('th');
let column2 = document.createElement('th');
let column3 = document.createElement('th');
let column4 = document.createElement('th');
let column5 = document.createElement('th');
let column6 = document.createElement('th');
let column7 = document.createElement('th');
let column8 = document.createElement('th');

let content1 = document.createTextNode("Modul");
let content2 = document.createTextNode("Lærer");
let content3 = document.createTextNode("Status");
let content4 = document.createTextNode("Aflever");
let content5 = document.createTextNode("Frist");
let content6 = document.createTextNode("Timer");
let content7 = document.createTextNode("Rettet");
let content8 = document.createTextNode("Titel");

column1.appendChild(content1);
column2.appendChild(content2);
column3.appendChild(content3);
column4.appendChild(content4);
column5.appendChild(content5);
column6.appendChild(content6);
column7.appendChild(content7);
column8.appendChild(content8);

row.appendChild(column1);
row.appendChild(column2);
row.appendChild(column3);
row.appendChild(column4);
row.appendChild(column5);
row.appendChild(column6);
row.appendChild(column7);
row.appendChild(column8);

// *

let table = document.getElementById('afleveringstabel');

table.appendChild(row)

let i = 1;
let content;
let switchNext = false;
readInterface.on('line', (line) => {
    content = document.createTextNode(line);

    let column;

    if (line.includes("Modul")) {
        row = document.createElement('tr');

        column = document.createElement('td');

        column.appendChild(content);
        row.appendChild(column);

        document.getElementById('afleveringstabel').appendChild(row);
    } else if (line.includes("Lærer") ||
            line.includes("Status") || line.includes("Aflever") ||
            line.includes("Frist") || line.includes("Timer") ||
            line.includes("Rettet") || line.includes("Titel")) {
        column = document.createElement('td');

        column.appendChild(content);
        row.appendChild(column);
    }
    i++;
});
