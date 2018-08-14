const fs = require("fs");
const http = require("http");
const getStream = require("get-stream");
const { render } = require("resume-export-html");

const createServer = (filename, theme) =>
  http.createServer(async (req, res) => {
    if (req.url != "/") {
      res.writeHead(302, {
        Location: "/"
      });

      res.end();

      return;
    }

    try {
      const resume = JSON.parse(await getStream(fs.createReadStream(filename)));
      const html = await render(resume, theme);

      res.write(html);
    } catch (e) {
      console.error(e);

      res.write(e.stack);
    } finally {
      res.end();
    }
  });

module.exports = createServer;
