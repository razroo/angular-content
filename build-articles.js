const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const articlesJsonName = './articles.json'
const articlesJson = require(articlesJsonName);
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let files = articlesJson.files;

addUidIfNonePreset(files);

for (x in files){
    let builtFilePath = `./build/articles/${files[x].path.split("/").pop()}`;
    builtFilePath = builtFilePath.replace("md", "html");

    mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
    razrooMarkdownEngine(files[x].path, builtFilePath).then((output)=>{
      console.log(output)
    })
}

function addUidIfNonePreset(files) {
   for(let file in files){
     let fileObject = files[file];

     if(fileObject.UID) {
       return;
     }
     else {
       fileObject["UID"] = uuidv4();
     }
   }

   console.log('articlesJson');
   console.log(articlesJson);
   fs.writeFile(articlesJsonName, JSON.stringify(articlesJson, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(articlesJson));
      console.log('writing to ' + articlesJsonName);
   });
}
