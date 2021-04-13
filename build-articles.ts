import {addUidIfNonePreset} from "./strapi-scripts/content-helpers";

const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const articlesJsonName = './articles.json';
const articlesJson = require(articlesJsonName);
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let files = articlesJson.files;

addUidIfNonePreset(files, articlesJson, articlesJsonName);

for (let x in files){
    let builtFilePath = `./build/articles/${files[x].path.split("/").pop()}`;
    builtFilePath = builtFilePath.replace("md", "html");

    mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
    razrooMarkdownEngine(files[x].path, builtFilePath).then((output)=>{
      console.log(output);
    })
}
