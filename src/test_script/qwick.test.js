// Single test script to register a user and post for them.
// Known issues:
// -  Posting an article on the development version causes an error but successfully completes post.
//

// Setup and constants
import {By, Builder} from "selenium-webdriver";
import pkg from 'jest';
const { describe, test, expect } = pkg;

const url = 'http://localhost:3000';
const regUrl = '/#/register';

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
// QA Note: This would normally be built for all browwsers
(async () => {
    let browser = await new Builder().forBrowser('chrome').build();
    await browser.get(url+regUrl);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/fieldset[1]/input")).sendKeys(userName);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/fieldset[2]/input")).sendKeys(userEmail);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/fieldset[3]/input")).sendKeys(userPw);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/button")).click();
    await browser.quit()
})();

// With new user added, test group to verify success begins.

(async () => {
    let browser = await Builder().forBrowser('chrome').build();
    test('Check for username on main page', async () => {
        await browser.get(url);
        const profile = (await browser.findElement(By.xpath("/html/body/div/nav/div/ul/li[4]/a")).getText())
        expect(profile).toContain(userName)
    })
})