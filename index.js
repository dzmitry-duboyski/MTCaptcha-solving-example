import puppeteer from "puppeteer";
import chalk from "chalk";
import { Solver } from "2captcha-ts";
const solver = new Solver("<Your 2captcha APIKEY>");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const [page] = await browser.pages();
  await page.setViewport({ width: 1080, height: 1024 });

  // Open target page that contains MTCaptcha.
  await page.goto("https://2captcha.com/demo/mtcaptcha");
  await page.waitForSelector("input[name='mtcaptcha-verifiedtoken']");

  // Get the `sitekey` parameter MTCaptcha from the current page.
  const mtCaptchaKey = await page.evaluate(() => {
    const mtCaptchaKey = window.mtcaptcha.getConfiguration().sitekey;
    // Or
    // const mtCaptchaKey = window.mtcaptchaConfig.sitekey
    return mtCaptchaKey;
  });

  console.log("MTCaptchaKey: " + mtCaptchaKey);

  // Show the block for clarity (this is not necessary).
  await page.evaluate(() => {
    document.querySelector("input[name='mtcaptcha-verifiedtoken']").type = "";
  });

  // Send a captcha to the 2captcha service to get a solution.
  // Solving the captcha will take some time, you need to wait.
  // If you get error 'ERROR_CAPTCHA_UNSOLVABLE' try again.
  const res = await solver.mtCaptcha({
    pageurl: "https://2captcha.com/demo/mtcaptcha",
    sitekey: mtCaptchaKey,
  });

  console.log("Answer:");
  console.log(res);

  // Answer. The answer is a token that needs to be applied to the page.
  const captchaAnswer = res.data;

  // Use the resulting solution(token) on the page
  const setAnswer = await page.evaluate((captchaAnswer) => {
    document.querySelector("input[name='mtcaptcha-verifiedtoken']").value =
      captchaAnswer;
  }, captchaAnswer);

  // Press the button to check the result.
  await page.click('button[type="submit"]');

  // Check result.
  await page.waitForSelector("form div pre code");

  const resultBlockSelector = "form div pre code";
  let statusSolving = await page.evaluate((selector) => {
    return document.querySelector(selector).innerText;
  }, resultBlockSelector);

  statusSolving = JSON.parse(statusSolving);
  if (statusSolving.success) {
    console.log(chalk.bgGreen("Captcha solved successfully!!!"));
  }

  browser.close();
})();
