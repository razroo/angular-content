import {addBookIdIfNoneExists, addChapterTitleIfNonePresent} from "./strapi-scripts/content-helpers";
// TOOD modify folder name from strapi-scripts to content-scripts
import {addUidIfNonePreset} from "./strapi-scripts/content-helpers";

const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const contentJsonName = './content.json';
const contentJson = require(contentJsonName);
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let files = contentJson.files;

addBookIdIfNoneExists(contentJson, contentJsonName);
addUidIfNonePreset(files, contentJson, contentJsonName);
// addChapterTitleIfNonePresent(files, bookJson, bookJsonName);

for (let x in files){
    let builtFilePath = `./build/book/${files[x].path.split("/").pop()}`;
    builtFilePath = builtFilePath.replace("md", "html");

    mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
    razrooMarkdownEngine(files[x].path, builtFilePath).then((output)=>{
      console.log(output);
    })
}