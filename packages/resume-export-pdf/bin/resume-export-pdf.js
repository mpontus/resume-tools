#!/usr/bin/env node
const minimist = require("minimist");
const { resumeToPdf } = require("../index");
const packageJson = require("../package.json");
const args = minimist(process.argv.slice(2));
const [filename, outputFilename] = args._;

if (!filename || !outputFilename || args.h || args.help) {
  console.log(`
${packageJson.name} [-t theme] <resume.json> <resume.pdf>

${packageJson.description}
`);

  process.exit(1);
}

resumeToPdf(filename, outputFilename, args.theme || args.t)
  .then(() => {
    console.log(`File is saved to ${outputFilename}`);

    process.exit(0);
  })
  .catch(e => {
    console.error(e);

    process.exit(1);
  });
