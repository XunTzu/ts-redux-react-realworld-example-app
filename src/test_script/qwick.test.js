// Single test script to register a user and post for them.
// Known issues:
// -  Posting an article on the development version causes an error but successfully completes post.
//

// Setup and constants
import {By, Builder} from "selenium-webdriver";

// Quick and dirty name generator for testing purposes while writing this.
// In a more mature setup this would be refined a bit and could be used for performance,
// load, and with more refinement international, character set, and boundary equivalance.
// Be more effecient to use faker.js, mocker, etc...

function generateNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function mapName () {
    let randomName = '';
    for(let i=0; i < generateNum(3, 12); i++) {
        const charNum = generateNum(1, 27);
        randomName += String.fromCharCode(97 + charNum);
    }
    return randomName;
}

let userName = mapName();
let userPw = 'secure';
let userEmail = userName + '@testmail.com';

// Open page, start directly with register

(async () => {
    let browser = await new Builder().forBrowser('chrome').build();
    await browser.get('http://localhost:3000/#/register');
    let pageTitle = await browser.getTitle();
    // eslint-disable-next-line no-console
    console.log(pageTitle);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/fieldset[1]/input")).sendKeys(userName);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/fieldset[2]/input")).sendKeys(userEmail);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/fieldset[3]/input")).sendKeys(userPw);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/button")).click();
})();


// user_enter.sendKeys(userName);
// email_enter.sendKeys(userEmail);
// pw_enter.sendKeys(userPw);
// submitUser.click()