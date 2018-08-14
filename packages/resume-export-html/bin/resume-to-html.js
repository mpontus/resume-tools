#!/usr/bin/env node
const fs = require("fs");
const { promisify } = require("util");
const minimist = require("minimist");
const getStream = require("get-stream");
const { render } = require("../index");
const packageJson = require("../package.json");
const args = minimist(process.argv.slice(2));
const [filename, outputFilename] = args._;

if (!filename || !outputFilename || args.h || args.help) {
  process.stdout.write(`
${packageJson.name} [-t <theme>] resume.json resume.html

${packageJson.description}
`);

  process.exit(1);
}

getStream(fs.createReadStream(filename))
  .then(resume => render(JSON.parse(resume), args.theme || args.t))
  .then(html => promisify(fs.writeFile.bind(fs))(outputFilename, html))
  .catch(e => {
    console.error(e);

    process.exit(1);
  });
