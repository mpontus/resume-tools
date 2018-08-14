# Resume to HTML

> Render resume in JSON Resume format as HTML

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
