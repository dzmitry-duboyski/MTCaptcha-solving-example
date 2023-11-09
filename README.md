![mtcaptcha-image](https://github.com/dzmitry-duboyski/MTcaptcha-solving-example/assets/38065632/b0c5e5f4-43c1-40b7-8502-4aba9c7fb8b9)

# How to automate an MTcaptcha solution in JavaScript (Puppeteer)

## Description
In this example, you can see how automate an MTcaptcha solution in JavaScript using [Puppeteer](https://pptr.dev/) and the [2captcha](https://2captcha.com/) service. [Puppeteer](https://pptr.dev/) is [Node.js](https://nodejs.org/) library using for automation. [2captcha](https://2captcha.com/) is service used to solve the captcha.

To interact with the [2captcha](https://2captcha.com/) API, this demo uses the [2captcha-ts](https://github.com/2captcha/2captcha-ts) package.

The entire process of automating the MTCaptcha bypass is described as comments in the [index.js]('./index.js') file.

In the example, a page with a captcha MTcaptcha is opened, then the `sitekey` value is searched on the page, then the captcha is sent to the 2captcha service for solution. When a solution is received, the resulting solution is applied on the page, and then a check occurs to see if the solution worked successfully.

If necessary, you can use a proxy server to solve MTcaptcha.

### Presetting 
Set your  2captcha `APIKEY` in `index.js` file instead of "<Your 2captcha APIKEY>"

### Usage

`npm i`

`npm run start`

### Useful links:
- [Documentation 2captcha API for MTCaptcha](https://2captcha.com/2captcha-api#mtcaptcha)
- [MTCaptcha demo page](https://2captcha.com/demo/mtcaptcha)
