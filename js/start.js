const fs = require('fs');

let userdataJSON = fs.readFileSync('./user-credentials.json');

let userdata = JSON.parse(userdataJSON);

let username = userdata.user[0].name;
let password = userdata.user[0].password;

console.log("Username:", username + ", Password:", password);

const {Builder, By, Key, until, promise} = require('selenium-webdriver');

let afleveringstabel;

(async function scrapeLudus() {
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
        let lektieKnap = menuKnapper[3];

        await lektieKnap.click();

        await driver.wait(until.titleIs('Lektier'));
        await driver.sleep(1000);

        let lektieMenuKnapper = await driver.findElements(By.className('v-caption'));
        let afleveringsKnap = await lektieMenuKnapper[1];

        await afleveringsKnap.click();

        console.log("sleep");
        await driver.sleep(1000);
        console.log("wake");

        let afleveringstabel = await driver.findElements(By.className('v-table-cell-wrapper'));

        //afleveringstabel = Promise.all(afleveringstabel).then((resolvedList) => {
        //    return resolvedList;
        //});

        //console.log(afleveringstabel[0].getText());

        //for (let i = 0; i < afleveringstabel.length; i++) {
        //    console.log(afleveringstabel[i].getText());
        //}

        //let _ = await afleveringstabel[0].getText();

        //console.log(_);

        //let _ = await afleveringstabel[0].getText();

        promise.filter(afleveringstabel, (element) => {
            element.getText().then((tekst) => console.log(tekst));
        });
    } finally{
        //driver.quit();
    }
})();

//document.getElementById("table-body").appendChild(afleveringstabel);

