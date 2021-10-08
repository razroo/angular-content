import { buildArticles } from "./strapi-scripts/build-articles";
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

for (const [x, file] of Object.entries(files) as any){
    let builtFilePath;
    if(files[x].subject) {
      console.log('file contains subject')
      for(const [index, subChapter] of Object.entries(files[x].chapters) as any){
        builtFilePath = `./build/book/${subChapter.path.split("/").pop()}`;
        builtFilePath = builtFilePath.replace("md", "html");

        mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
        razrooMarkdownEngine(subChapter.path, builtFilePath).then((output)=>{
          console.log(output);
        })
        
        buildArticles(subChapter)
      }
    }
    else {
      builtFilePath = `./build/book/${file.path.split("/").pop()}`;
      builtFilePath = builtFilePath.replace("md", "html");
  
      mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
      razrooMarkdownEngine(file.path, builtFilePath).then((output)=>{
        console.log(output);
      })
      buildArticles(file)
    }
    
}