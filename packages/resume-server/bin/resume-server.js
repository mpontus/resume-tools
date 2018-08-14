#!/usr/bin/env node
const fs = require("fs");
const minimist = require("minimist");
const getStream = require("get-stream");
const render = require("resume-to-html");
const createServer = require("../index");

const DEFAULT_PORT = 4000;
const HOST = process.env.HOST || "0.0.0.0";
const DEFAULT_FILENAME = "resume.json";

const args = minimist(process.argv.slice(2));
const port = parseInt(args.port || args.p || DEFAULT_PORT);
const filename = args._[0];

if (!filename || args.h || args.help) {
  process.stdout.write(`
resume-serve [-p <port>] [-t <theme>] <filename>

Start JSON Resume rendering server.
`);

  process.exit(0);
}

getStream(fs.createReadStream(filename)).then(resume => {
  const server = createServer(JSON.parse(resume), args.theme || args.t);

  server.listen(port, HOST, () => {
    const { address, port } = server.address();

    console.log(`Server listening on http://${address}:${port}/`);
  });
});
