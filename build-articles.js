const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const articlesJson = require('./articles.json');
const { v4: uuidv4 } = require('uuid');

let files = articlesJson.files;
for (x in files){
    addUidIfNonePreset(files[x]);
    let builtFilePath = `./build/articles/${files[x].path.split("/").pop()}`;
    builtFilePath = builtFilePath.replace("md", "html");

    mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
    razrooMarkdownEngine(files[x].path, builtFilePath).then((output)=>{
        console.log(output)
    })
}

function addUidIfNonePreset(fileObject) {
   if(fileObject.UID) {
     return;
   }
   else {
     fileObject.UID = uuidv4();
   }
   console.log('fileObject');
   console.log(fileObject);
}
