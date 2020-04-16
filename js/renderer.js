const { Builder, Capabilities } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome")
var capabilities = Capabilities.chrome();
//To avoid InsecureCertificateError for selenium4-aplha5
capabilities.setAcceptInsecureCerts(true);
//capabilities.set("browserVersion", "67");
capabilities.set("platformName", "Windows 10");
(async function helloSelenium() {
    let driver = new Builder()
        .usingServer("http://google.com")   
        .withCapabilities(capabilities)
        .build();
    try {
        await driver.get('http://www.google.com');
    }    
    finally {       
        await driver.quit();
    }
})(); 

var remote = require('selenium-webdriver/remote');
driver.setFileDetector(new remote.FileDetector);

driver.get("http://sso.dev.saucelabs.com/test/guinea-file-upload");
var upload = driver.findElement(By.id("myfile"));
upload.sendKeys("/Users/sso/the/local/path/to/darkbulb.jpg");

