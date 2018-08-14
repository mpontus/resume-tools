# Resume to HTML

> Export resume in JSON Resume format to HTML

### Usage

```
npx resume-export-html [-t <theme>] resume.json > resume.html
```

### API

```
const { render } = require('resume-export-html');

cosnt htmlString = render({ 
	// JSON Resume
}, 'kwan');
```
