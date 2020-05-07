const fs = require('fs');

let userdataJSON = fs.readFileSync('./user-credentials.json');

let userdata = JSON.parse(userdataJSON);

let username = userdata.user[0].name;
let password = userdata.user[0].password;

console.log("Username:", username + ", Password:", password);

const {Builder, By, Key, until, promise} = require('selenium-webdriver');

let afleveringstabel;

(async function example() {
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

        await driver.wait(until.elementLocated(By.className('v-window-closebox')), 5000).click();

        let menuKnapper = await driver.findElements(By.className('v-menubar-menuitem-caption'));
        let lektieKnap = menuKnapper[3];

        await lektieKnap.click();

        //let lektieMenuKnapper = await driver.findElements(By.className('v-caption'));
        let afleveringsKnap = await driver.findElements(By.css('width: 90px;'));

        promise.filter(lektieMenuKnapper, (knap) => {
            console.log(knap);
        });

        //let _ = driver.wait(until.elementLocated(By.className('v-slot v-slot-h2 v-align-bottom')), 5000).click();

        await afleveringsKnap.click();

        //afleveringstabel = driver.findElements(By.className('v-slot v-slot-small'));
    } finally{
        //driver.quit();
    }
})();

//document.getElementById("table-body").appendChild(afleveringstabel);

