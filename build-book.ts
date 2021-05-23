import {addBookIdIfNoneExists, addChapterTitleIfNonePresent} from "./strapi-scripts/content-helpers";

const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const bookJsonName = './book.json';
const bookJson = require(bookJsonName);
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

let files = bookJson.files;

addBookIdIfNoneExists(bookJson, bookJsonName);
// addChapterTitleIfNonePresent(files, bookJson, bookJsonName);

for (let x in files){
    let builtFilePath = `./build/book/${files[x].path.split("/").pop()}`;
    builtFilePath = builtFilePath.replace("md", "html");

    mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
    razrooMarkdownEngine(files[x].path, builtFilePath).then((output)=>{
      console.log(output);
    })
}