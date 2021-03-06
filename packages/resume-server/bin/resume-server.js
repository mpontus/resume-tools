#!/usr/bin/env node
const minimist = require("minimist");
const createServer = require("../index");
const packageJson = require("../package.json");

const DEFAULT_PORT = 4000;
const HOST = process.env.HOST || "0.0.0.0";
const DEFAULT_FILENAME = "resume.json";

const args = minimist(process.argv.slice(2));
const port = parseInt(args.port || args.p || DEFAULT_PORT);
const filename = args._[0];

if (!filename || args.h || args.help) {
  process.stdout.write(`
${packageJson.name} [-p <port>] [-t <theme>] <filename>

${packageJson.description}
`);

  process.exit(1);
}

const server = createServer(filename, args.theme || args.t);

server.listen(port, HOST, () => {
  const { address, port } = server.address();

  console.log(`Server listening on http://${address}:${port}/`);
});
