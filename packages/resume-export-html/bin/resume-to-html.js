#!/usr/bin/env node
const fs = require("fs");
const minimist = require("minimist");
const getStream = require("get-stream");
const { render } = require("../index");
const args = minimist(process.argv.slice(2));

if (args.h || args.help) {
  process.stdout.write(`
resume-export-html [-t <theme>] <filename.json> > output.html
resume-export-html [-t <theme>] < <filename.json> > output.html

Convert resume in JSON Resume format to HTML.
    `);

  process.exit(0);
}

getStream(args._.length ? fs.createReadStream(args._[0]) : process.stdin)
  .then(resume => render(JSON.parse(resume), args.theme || args.t))
  .then(html => {
    process.stdout.write(html);

    process.exit(0);
  })
  .catch(e => {
    console.error(e);
    process.exit(0);
  });
