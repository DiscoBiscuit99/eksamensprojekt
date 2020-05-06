const {Builder, By, Key, util} = require("selenium-webdriver");

async function example() {
  let driver = await new Builder().withCapabilities({'browserName': 'firefox', acceptSslCerts: true, acceptInsecureCerts: true}).build()
  await driver.get("https://ludus.rybners.dk/ui/main")
  await driver.navigate().refresh();
  // await driver.findElement(By.id("advancedButton")).sendKeys(Key.RETURN);
  // await driver.findElement(By.class("v-button-wrap")).sendKeys(Key.RETURN);
}
example();
