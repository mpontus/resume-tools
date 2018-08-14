const path = require("path");
const assert = require("assert");
const request = require("superagent");

const DEFAULT_THEME = "minimal";
const THEME_SERVER =
  process.env.THEME_SERVER || "https://themes.jsonresume.org/theme/";

const resolveLocalTheme = name =>
  resolveInstalledTheme(path.resolve(process.cwd(), name));

const resolveInstalledTheme = name => {
  try {
    const theme = require(name);

    assert(typeof theme.render === "function");

    return Promise.resolve(theme.render);
  } catch (e) {
    return Promise.reject(e);
  }
};

// Attribution: https://github.com/jsonresume/resume-cli/blob/master/lib/builder/index.js
const renderWithRemoteTheme = (theme, resume) =>
  new Promise((resolve, reject) => {
    request
      .post(THEME_SERVER + theme)
      .send({
        resume
      })
      .set("Accept", "application/json")
      .end(function(err, response) {
        if (err) {
          reject(err);
        } else if (!response.text) {
          reject(new Error("Theme server returned invalid response"));
        } else {
          resolve(response.text);
        }
      });
  });

const render = (resume, theme = DEFAULT_THEME) =>
  resolveLocalTheme(theme)
    .catch(() => resolveInstalledTheme(`jsonresume-theme-${theme}`))
    .catch(() => resolveInstalledTheme(theme))
    .catch(() => resume => renderWithRemoteTheme(theme, resume))
    .then(render => render(resume));

module.exports = {
  render
};
