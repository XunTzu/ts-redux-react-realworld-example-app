// Single test script to register a user and post for them.
// Known issues:
// -  Posting an article on the development version causes an error but successfully completes post.
//

// Setup and constants
import {By, Builder, until} from "selenium-webdriver";

//const url = 'http://localhost:3000';
const regUrl = 'http://localhost:3000/#/register';

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
let title = 'Test Post by ' + userName;
let about = 'Testing Apps';
let article = 'I test therefore you work';

// Open page, start directly with register
// QA Note: This would normally be built for all browwsers
(async () => {
    // Linear run setup via Selenium to test navigation and allow visibility to testing process
    // Typically this would also use a series of screenshots for archived validation and research

    //Initial setup and fetch page
    let browser = await new Builder().forBrowser('chrome').build();
    await browser.manage().setTimeouts( { implicit: 10000, pageLoad: 10000, script: 10000} );
    await browser.get(regUrl);

    // Send values for new user then submit (Sign Up button)
    // linear repeating commands is more for readability on a small app like this, for re-useability or
    // larger test sets this would be an array of tuples run through a loop.
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/fieldset[1]/input")).sendKeys(userName);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/fieldset[2]/input")).sendKeys(userEmail);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/fieldset[3]/input")).sendKeys(userPw);
    await browser.findElement(By.xpath("/html/body/div[1]/div/div/div/div/form/fieldset/button")).click();

    //Wait for navigation to complete back to front page with new user logged in after Signing Up (default behaviour of app)
    const el = By.linkText(userName);
    browser.wait(until.elementLocated(el));
    const hrefEl = browser.findElement(el);
    browser.wait(until.elementIsVisible(hrefEl));
    const userText = await hrefEl.getText();
    
    //Placeholder console log to allow commit without TypeScript linter yelling
    // eslint-disable-next-line no-console
    console.log('User added successfully: ', userText);
    
    // Now we move to posting a new article for the new user

    // Note: During manual testing it has been discovered that clicking Publish Article Button has no visible effect
    // and appears as if nothing was posted, user is left in edit.  By clicking on user's name top right, it becomes
    // apparent that it did post but did not move to a different page or inform user.  Definetely a defect but beyond
    // the scope of this assessment.
    const postLinkText = 'New Article';
    // const publishLinkText = 'Publish Article';

    await browser.findElement(By.linkText(postLinkText)).click();

    const et = By.xpath("/html/body/div/div/div/div/div/form/fieldset/button");
    browser.wait(until.elementLocated(et));
    const postEt = browser.findElement(et);
    browser.wait(until.elementIsVisible(postEt));
    // const publishText = await postEt.getText();
    

    await browser.findElement(By.xpath("/html/body/div/div/div/div/div/form/fieldset/fieldset[1]/input")).sendKeys(title);
    await browser.findElement(By.xpath("/html/body/div/div/div/div/div/form/fieldset/fieldset[2]/input")).sendKeys(about);
    await browser.findElement(By.xpath("/html/body/div/div/div/div/div/form/fieldset/fieldset[3]/textarea")).sendKeys(article);
    await browser.findElement(By.xpath("/html/body/div/div/div/div/div/form/fieldset/button")).click();
    //Workaround for no post on 'Publish Article' click
    await browser.findElement(el).click();

    //Same as before, this should have been turned into a function but for a small one off, works.  Mostly.
    const ep = By.xpath('/html/body/div/div/div[2]/div/div/div[2]/a/h1');
    browser.wait(until.elementLocated(ep));
    const postEl = browser.findElement(ep);
    browser.wait(until.elementIsVisible(postEl))
    const postText = await postEl.getText();

    
})();
it("Shows user created successfully", () => {
    expect(userText).toContain(userName)
});
it("tests user post created successfully", () => {
    expect(postText).toContain(userName)
});

