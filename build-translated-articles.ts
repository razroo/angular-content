
const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const articlesJsonName = './articles.json';
const articlesJson = require(articlesJsonName);
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let files = articlesJson.files;

// for (let x in files){
    let stagingPath = `./staging/articles/es/${files[0].path.split("/").pop()}`;
    let builtFilePath = `./build/articles/es/${files[0].path.split("/").pop()}`;
    builtFilePath = builtFilePath.replace("md", "html");

    mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
    razrooMarkdownEngine(stagingPath, builtFilePath).then((output)=>{
      console.log(output);
    })
// }
