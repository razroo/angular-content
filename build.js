const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
var glob = require("glob")

let files = glob.sync("state/**/*.md")
for (x in files){
    let builtFilePath = `./build/${files[x]}`
    mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
    razrooMarkdownEngine(files[x], builtFilePath).then((output)=>{
        console.log(output)
    })
}
