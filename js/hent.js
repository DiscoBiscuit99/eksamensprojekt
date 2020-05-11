const {Builder, By, Key, until, promise} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const fs = require('fs');

let userdataJSON = fs.readFileSync('./user-credentials.json');

let userdata = JSON.parse(userdataJSON);

let username = userdata.user[0].name;
let password = userdata.user[0].password;

console.log("Username:", username + ", Password:", password);

function scrape() {
    let fetchingDataText = document.createTextNode("Henter data, bliv venligst på siden...");
    document.getElementById('getDataText').appendChild(fetchingDataText);

    console.log("Starting Selenium Webdriver...");

    (async function scrapeLudus() {
        let options = new firefox.Options();
        options.addArguments("-headless");

        let driver = await new Builder().withCapabilities({
            'browserName': 'firefox',
            acceptSslCerts: true,
            acceptInsecureCerts: true
        }).setFirefoxOptions(options).build()

        try {
            // Navigate to Rybners/Ludus login.
            await driver.get('https://ludus.rybners.dk/samllogin');

            await driver.findElement(By.name('UserName')).sendKeys(username);
            await driver.findElement(By.name('Password')).sendKeys(password);
            await driver.findElement(By.id("submitButton")).sendKeys(Key.RETURN);
            await driver.wait(until.elementLocated(By.className('v-window-closebox'))).click();
            await driver.wait(until.titleIs('Skemaer'));

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

            // Initialize iterator and prefix table.
            let i = 0;
            let prefixes = ["Dato: ", "Ugedag: ", "Fag: ", "Lektier: ",
                            "Øvrigt materiale: ", "Links: ", "Dokumenter: "];

            promise.filter(lektietabel, (element) => {
                element.getText().then((tekst) => {
                    console.log(tekst);

                    // Append the new text.
                    fs.appendFile('lektier.txt', prefixes[i % prefixes.length] + tekst + '\n', 'utf8', (err) => {
                        if (err) throw err;
                        console.log('Text appended to lektier.txt');
                    });

                    i++;
                });
            });

            /// Scrape under afleveringstabbet. ///

            let lektieMenuKnapper = await driver.findElements(By.className('v-caption'));
            let everingsKnap = await lektieMenuKnapper[1];

            await everingsKnap.click();

            console.log("sleep");
            await driver.sleep(1000);
            console.log("wake");

            let everingstabel = await driver.findElements(By.className('v-table-cell-wrapper'));

            // Clear the file's contents.
            fs.writeFile('afleveringer.txt', '', 'utf8', (err) => {
                if (err) throw err;
            });

            // Reset iterator.
            i = 0;
            prefixes = ["Modul: ", "Lærer: ", "Status: ", "Aflever: ",
                        "Frist: ", "Timer: ", "Rettet: ", "Titel: "];

            promise.filter(everingstabel, (element) => {
                element.getText().then((tekst) => {
                    console.log(tekst)

                    // Append the new text.
                    fs.appendFile('afleveringer.txt', prefixes[i % prefixes.length] + tekst + '\n', 'utf8', (err) => {
                        if (err) throw err;
                        console.log('Text appended to afleveringer.txt');
                    });

                    i++;
                });
            });
            
            console.log("DONE");
        } finally{
            //await driver.quit();

            document.getElementById('getDataText').innerHTML = 'Data hentet.';
        }
    })();
}
