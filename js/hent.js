const {Builder, By, Key, until, promise} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const fs = require('fs');

// Read the user credentials from the user-credentials file.
let userdataJSON = fs.readFileSync('./user-credentials.json');

// Parse it to a JavaScript object.
let userdata = JSON.parse(userdataJSON);

// Grab the username and password from the object.
let username = userdata.user[0].name;
let password = userdata.user[0].password;

// Print out the credentials to the console.
console.log("Username:", username + ", Password:", password);

// This is the scraping function that is called as the onclick-event when clicking the "Hent data"-button.
function scrape() {
    // Inform the user, that the program is scraping the data.
    let fetchingDataText = document.createTextNode("Henter data, bliv venligst på siden...");
    document.getElementById('getDataText').appendChild(fetchingDataText);

    console.log("Starting Selenium Webdriver...");

    // Start the async funktion.
    (async function scrapeLudus() {
        // Create the options for firefox and add the headless argument.
        let options = new firefox.Options();
        options.addArguments("-headless");

        // Build the driver.
        let driver = await new Builder().withCapabilities({
            'browserName': 'firefox',
            acceptSslCerts: true,
            acceptInsecureCerts: true
        }).setFirefoxOptions(options).build()

        try {
            // Navigate to Rybners/Ludus login.
            await driver.get('https://ludus.rybners.dk/samllogin');

            // Find the login input fields and submit the user credentials.
            await driver.findElement(By.name('UserName')).sendKeys(username);
            await driver.findElement(By.name('Password')).sendKeys(password);
            await driver.findElement(By.id("submitButton")).sendKeys(Key.RETURN);

            // Wait for Ludus to load, and close the popup window when it is found, then wait until the title of the tab is 'Skemaer'.
            await driver.wait(until.elementLocated(By.className('v-window-closebox'))).click();
            await driver.wait(until.titleIs('Skemaer'));

            // Grab the menu buttons.
            let menuKnapper = await driver.findElements(By.className('v-menubar-menuitem-caption'));

            /// Scrape under lektietabbet. ///

            // Locate the homework specific button.
            let lektieKnap = menuKnapper[3];

            // Try to let it sleep to avoid clicking before the page is loaded.
            console.log("sleep");
            await driver.sleep(1000);
            console.log("wake");

            // Click it.
            await lektieKnap.click();

            // Now wait until the title is lektier and sleep to prevent errors from blocking elements on the page.
            await driver.wait(until.titleIs('Lektier'));
            await driver.sleep(1000);

            console.log("sleep");
            await driver.sleep(1000);
            console.log("wake");

            // Grab the homework table.
            let lektietabel = await driver.findElements(By.className('v-table-cell-wrapper'));

            // Clear the save file's contents.
            fs.writeFile('lektier.txt', '', 'utf8', (err) => {
                if (err) throw err;
            });

            // Initialize iterator and prefix table.
            let i = 0;
            let prefixes = ["Dato: ", "Ugedag: ", "Fag: ", "Lektier: ",
                            "Øvrigt materiale: ", "Links: ", "Dokumenter: "];

            // Filter through the array of promises.
            promise.filter(lektietabel, (element) => {
                // Unpack each promise to get the innerHTML of the columns.
                element.getText().then((tekst) => {
                    console.log(tekst);

                    // Append the new text to the file and set the prefix according to the current index.
                    // By using the modulus operator, one can keep the indeces inside the bounds of the prefix array.
                    fs.appendFile('lektier.txt', prefixes[i % prefixes.length] + tekst + '\n', 'utf8', (err) => {
                        if (err) throw err;
                        console.log('Text appended to lektier.txt');
                    });

                    // Increment iterator.
                    i++;
                });
            });

            /// Scrape under afleveringstabbet. (This code is the same as the above, but targeting instead the submissions section) ///
            
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
            
            // This block is HOPEFULLY done.
            console.log("DONE");
        } finally{
            // Unfortunately, quitting will terminate the scraping process prematurely.
            //await driver.quit();

            // Inform the user that the data has been scraped (a little prematurely).
            document.getElementById('getDataText').innerHTML = 'Data hentet.';
        }
    })();
}
