const {Builder, By, Key, until, promise} = require('selenium-webdriver');
const fs = require('fs');

let userdataJSON = fs.readFileSync('./user-credentials.json');

let userdata = JSON.parse(userdataJSON);

let username = userdata.user[0].name;
let password = userdata.user[0].password;

console.log("Username:", username + ", Password:", password);

function scrape() {
    (async function scrapeLudus() {
        document.getElementById("getDataText").innerHTML = "Henter data..."
        let driver = await new Builder().withCapabilities({
            'browserName': 'firefox',
            acceptSslCerts: true,
            acceptInsecureCerts: true
        }).build()

        try {
            // Navigate to Rybners/Ludus login.
            await driver.get('https://ludus.rybners.dk/samllogin');

            await driver.findElement(By.name('UserName')).sendKeys(username);
            await driver.findElement(By.name('Password')).sendKeys(password);
            await driver.findElement(By.id("submitButton")).sendKeys(Key.RETURN);

            await driver.wait(until.titleIs('Skemaer'));
            await driver.wait(until.elementLocated(By.className('v-window-closebox'))).click();

            let menuKnapper = await driver.findElements(By.className('v-menubar-menuitem-caption'));

            /// Scrape under lektietabbet. ///

            let lektieKnap = menuKnapper[3];

            console.log("sleep");
            await driver.sleep(1000);
            console.log("wake");

            await lektieKnap.click();

            await driver.wait(until.titleIs('Lektier'));
            await driver.sleep(1000);

            console.log("sleep");
            await driver.sleep(1000);
            console.log("wake");

            let lektietabel = await driver.findElements(By.className('v-table-cell-wrapper'));

            // Clear the file's contents.
            fs.writeFile('lektier.txt', '', 'utf8', (err) => {
                if (err) throw err;
            });

            // Initialize iterator and prefix.
            let i = 1;
            let prefix = "";
            promise.filter(lektietabel, (element) => {
                element.getText().then((tekst) => {
                    console.log(tekst);

                    prefix = "";

                    if (i % 7 == 0) {
                        prefix = "Dokumenter: ";
                    } else if (i % 6 == 0) {
                        prefix = "Links: ";
                    } else if (i % 5 == 0) {
                        prefix = "Øvrigt materiale: ";
                    } else if (i % 4 == 0) {
                        prefix = "Lektier: ";
                    } else if (i % 3 == 0) {
                        prefix = "Fag: ";
                    } else if (i % 2 == 0) {
                        prefix = "Ugedag: ";
                    } else {
                        prefix = "Dato: ";
                    }

                    // Append the new text.
                    fs.appendFile('lektier.txt', prefix + tekst + '\n', 'utf8', (err) => {
                        if (err) throw err;
                        console.log('Text appended to lektier.txt');
                    });

                    i++;
                });
            });

            /// Scrape under afleveringstabbet. ///

            let lektieMenuKnapper = await driver.findElements(By.className('v-caption'));
            let afleveringsKnap = await lektieMenuKnapper[1];

            await afleveringsKnap.click();

            console.log("sleep");
            await driver.sleep(1000);
            console.log("wake");

            let afleveringstabel = await driver.findElements(By.className('v-table-cell-wrapper'));

            // Clear the file's contents.
            fs.writeFile('afleveringer.txt', '', 'utf8', (err) => {
                if (err) throw err;
            });

            // Reset iterator.
            i = 1;
            prefix = "";
            promise.filter(afleveringstabel, (element) => {
                element.getText().then((tekst) => {
                    console.log(tekst)

                    if (i % 8 == 0) {
                        prefix = "Titel: ";
                    } else if (i % 7 == 0) {
                        prefix = "Rettet: ";
                    } else if (i % 6 == 0) {
                        prefix = "Timer: ";
                    } else if (i % 5 == 0) {
                        prefix = "Frist: ";
                    } else if (i % 4 == 0) {
                        prefix = "Aflever: ";
                    } else if (i % 3 == 0) {
                        prefix = "Status: ";
                    } else if (i % 2 == 0) {
                        prefix = "Lærer: ";
                    } else {
                        prefix = "Modul: ";
                    }

                    // Append the new text.
                    fs.appendFile('afleveringer.txt', prefix + tekst + '\n', 'utf8', (err) => {
                        if (err) throw err;
                        console.log('Text appended to afleveringer.txt');
                    });

                    i++;
                });
            });

            console.log("DONE");
            document.getElementById("getDataText").innerHTML = "Data hentet"
            //driver.quit();
        } finally{
            //driver.quit();
        }
    })();
}
