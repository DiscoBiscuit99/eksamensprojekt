// Importere Nodes 'File system' modul, bruges til at skrive til filer
const fs = require('fs');
// Importere Nodes 'Readline' modul, bruges til at læse filer per linje
const readline = require('readline');

// Instantiere interface, der læser filen "karakterer" og outputter som standard stream (STDOUT).
const readInterface = readline.createInterface({
    input: fs.createReadStream('karakterer.txt'),
    output: process.stdout,
    console: false
});

// Instantiere række til tabellen der blev lavet i "karakter.html"
let row = document.createElement('tr');

// Instantiere kolonnerne til tabellen
let column1 = document.createElement('th');
let column2 = document.createElement('th');
let column3 = document.createElement('th');

// Instantiere titlerne til kolonnerne
let content1 = document.createTextNode("Termin");
let content2 = document.createTextNode("Fag");
let content3 = document.createTextNode("Karakter");

// Tilføjer titlen til kolonnerne
column1.appendChild(content1);
column2.appendChild(content2);
column3.appendChild(content3);
// Tilføjer rækkerne til kolonnerne
row.appendChild(column1);
row.appendChild(column2);
row.appendChild(column3);

// Instantiere tabellen udefra html elementet i "karakter.html"
let table = document.getElementById('karaktertabel');

// Tilføjer rækkerne til tabellen.
table.appendChild(row)

// Variabler til kolonnerne og rækkerne.
let content;
let column;

/* Objektet til readline interfacet 'line' outputter hver gang
den modtager en breakline som input
(inputtet er variablen 'line' i dette tilfælde), fx \n. */
readInterface.on('line', (line) => {
    // Instantiere text i html udefra variablen line
    content = document.createTextNode(line);

    // Kører når linjen i txt filen inkludere Termin
    if (line.includes("Termin")) {
        // Række og kolonne instantieres
        row = document.createElement('tr');
        column = document.createElement('td');
        // teksten tilføjes til kolonnen
        column.appendChild(content);
        row.appendChild(column);
        // Skrives til karakter tabellen i html filen.
        document.getElementById('karaktertabel').appendChild(row);

      // Kører når linjen inkludere 'Fag' eller 'Karakter'
    } else if ((line.includes("Fag")) || (line.includes("Karakter"))){
        column = document.createElement('td');
        column.appendChild(content);
        row.appendChild(column);
    }
});
