// const {Builder, By, Key, until, promise} = require('selenium-webdriver');
// const fs = require('fs');
//
// let userdataJSON = fs.readFileSync('./user-credentials.json');
//
// let userdata = JSON.parse(userdataJSON);
//
// let username = userdata.user[0].name;
// let password = userdata.user[0].password;
//
// console.log("Username:", username + ", Password:", password);
//
// function writeKarakterToFile() {
//
//
// }
//
// function scrape() {
//   let fetchingDataText = document.createTextNode("Henter data, bliv venligst på siden...");
//   document.getElementById('getDataText').appendChild(fetchingDataText);
//
//   (async function scrapeKarakter() {
//     let driver = new Builder().withCapabilities({
//         'browserName': 'firefox',
//         acceptSslCerts: true,
//         acceptInsecureCerts: true
//     }).build()
//
//     try {
//       await driver.get('https://ludus.rybners.dk/samllogin');
//       await driver.findElement(By.name('UserName')).sendKeys(username);
//       await driver.findElement(By.name('Password')).sendKeys(password);
//       await driver.findElement(By.id("submitButton")).sendKeys(Key.RETURN);
//       await driver.wait(until.titleIs('Skemaer'));
//       // await driver.wait(until.elementLocated(By.className('v-window-closebox'))).click();
//       let menuKnapper = await driver.findElements(By.className('v-menubar-menuitem-caption'));
//       let karakterKnap = menuKnapper[1];
//       await karakterKnap.click();
//       await driver.findElement(By.xpath("//span[contains(text(),'*Kursist')]")).click();
//       // await driver.findElement(By.cssSelector("")).click();
//       // let karakterTab = await driver.findElement(By.id('C.91'));
//       // let asdf = karakterTab[3];
//       // await asdf.click();
//
//       await driver.findElement(By.xpath('//*[@id="C.42"]/div[1]/div/div[4]')).click();
//       // await driver.findElement(By.id('C.1123')).click();
//
//       // writeKarakterToFile();
//
//     } finally {
//
//       document.getElementById('getDataText').innerHTML = 'Data hentet.';
//     }
//   })();
// }
