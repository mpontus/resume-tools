# Resume Tools

> A small collection of scripts for working with resume in JSON Resume format

### Why?

[`resume-cli`](https://github.com/jsonresume/resume-cli) does not work very well with local themes.

Anywhere you see `[-t <theme>]` you can pass a path to a local theme package or specify a name of a locally installed theme.

If the theme could not be resolved locally, remote theme server will be used as a fallback.


### Usage

Preview a resume in the browser:

```
npx resume-server [-t <theme>] [-p <port>] resume.json
```

Save resume as HTML:

```
npx resume-export-html [-t theme] < resume.json > resume.html
```

Save resume as PDF:

```
npx resume-export-html [-t theme] resume.json resume.html
```

## License

[MIT](./LICENSE) © Mikhail Pontus
