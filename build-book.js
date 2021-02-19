const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')

let bookFile = 'main-book.md';
let builtFilePath = `./build/book/${bookFile}`
mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
razrooMarkdownEngine(bookFile, builtFilePath).then((output)=>{
    console.log(output)
})
