const {Builder, By, Key, util} = require("selenium-webdriver");

async function example() {
  let driver = await new Builder().withCapabilities({'browserName': 'firefox', acceptSslCerts: true, acceptInsecureCerts: true}).build()
  await driver.get("https://ludus.rybners.dk/samllogin")

  await driver.findElement(By.id("userNameInput")).sendKeys("kjel0393");
  await driver.findElement(By.id("passwordInput")).sendKeys("Kjell250968");
  await driver.findElement(By.id("submitButton")).sendKeys(Key.RETURN);
}
example();
