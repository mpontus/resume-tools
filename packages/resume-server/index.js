const http = require("http");
const { render } = require("resume-export-html");

const createServer = (resume, theme) =>
  http.createServer(async (req, res) => {
    if (req.url != "/") {
      res.writeHead(302, {
        Location: "/"
      });

      res.end();

      return;
    }

    try {
      const html = await render(resume, theme);

      res.write(html);
    } catch (e) {
      console.error(e);

      console.log({ e, stack: e.stack });

      res.write(e.stack);
    } finally {
      res.end();
    }
  });

module.exports = createServer;
