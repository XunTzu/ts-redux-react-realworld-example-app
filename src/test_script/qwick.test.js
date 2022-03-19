// Single test script to register a user and post for them.
// Known issues:
// -  Posting an article on the development version causes an error but successfully completes post.
//

// Setup and constants
import {By, Builder} from "selenium-webdriver";
// const { By } = webdriver;

let userName = 'Yata';
let userPw = 'secure';
let userEmail = 'yata@testmail.com';

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