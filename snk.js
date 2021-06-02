/**
 *
 * Skeleton for puppeteer pwnage 
 * Simple auth and take screenshot
 *
 **/

const { uploadScreenshot } = require("./uploadScreenshot");
const chromium = require('chrome-aws-lambda');

module.exports.pwn = async (event, context, callback) => {

  let browser = null;
  
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });
  
  // define name for this puppeter action
  const screenshot = `snktest-${event.login}`;

  const page = await browser.newPage()
 
  // Specify target url 
  await page.goto('http://x.x.x.x:6969/')
 
  // Set login
  await page.click('#username');
  await page.keyboard.type(event.login);
  
  // Set password
  await page.click('#password');
  await page.keyboard.type(event.password);
 
  // click on login button
  await page.click('body > div > div > form > button');
  
  // define temp screenshot file
  const imagePath = `/tmp/${screenshot}-${new Date().getTime()}.png`;
  await page.screenshot({ path: imagePath })
  browser.close()
  
  //Debug purpose as usual 
  console.log(' Login and screenshot done ')

  // upload screenshot to S3
  const url = await uploadScreenshot(imagePath, screenshot);

  // Return URL where screenshot is stored on S3 bucket
  //return url;

  //return result;
  console.log('result: ' + url )
  callback(null, url);

};
