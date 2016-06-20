# American Express github.io site

Visit us at - http://americanexpress.github.io

View our open source contributions at http://github.com/americanexpress

This site uses following technologies
* Jekyll 
* Liquid
* HTML5
* CSS3
* Grunt


## Getting Started

### Set it up


**1\.** Clone the repository and its submodules:

```bash
git clone https://github.com/americanexpress/americanexpress.github.io.git
cd americanexpress.github.io
```

**2\.** Install modules and tools

```bash
npm install
gem install bundler
bundle install
```
**3\.** Start development server using Grunt

```bash
grunt serve
```

### Open in Browser
If the server starts successfully and you have not made any other changes, then you should be able to access this site at 

```bash
http://localhost:4000
```

### Change ``` port ``` for local dev launch

Update port entry in _config.yml file. By default it is 4000

### Changes to style

Changes to the style sheets should be done using scss file located under ``` $home/_scss ``` .

main.css file is auto build when Grunt task is run.

