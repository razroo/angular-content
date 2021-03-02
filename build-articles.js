const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const articlesJson = require('./articles.json');

let files = articlesJson.files;
for (x in files){
    let builtFilePath = `./build/articles/${files[x].split("/").pop()}`;
    builtFilePath = builtFilePath.replace("md", "html");

    mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
    razrooMarkdownEngine(files[x], builtFilePath).then((output)=>{
        console.log(output)
    })
}
