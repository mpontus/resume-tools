const fs = require("fs");
const puppeteer = require("puppeteer");
const getStream = require("get-stream");
const { render } = require("resume-export-html");

// Attribution: https://github.com/jsonresume/resume-cli/blob/master/lib/export-resume/index.js
const saveHtmlAsPdf = async (html, filename) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.emulateMedia("screen");
  await page.goto(`data:text/html,${html}`, { waitUntil: "networkidle0" });
  await page.pdf({
    path: filename,
    format: "Letter",
    printBackground: true
  });

  await browser.close();
};

const resumeToPdf = async (resumeFilename, outputFilename, theme) => {
  const resume = JSON.parse(
    await getStream(fs.createReadStream(resumeFilename))
  );
  const html = await render(resume, theme);

  return saveHtmlAsPdf(html, outputFilename);
};

module.exports = {
  resumeToPdf
};
