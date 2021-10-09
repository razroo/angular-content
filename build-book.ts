import { buildArticlesHTML } from "./strapi-scripts/build-articles";
import { buildBookHTML } from "./strapi-scripts/build-book";
import {addBookIdIfNoneExists, addChapterTitleIfNonePresent} from "./strapi-scripts/content-helpers";
// TOOD modify folder name from strapi-scripts to content-scripts
import {addUidIfNonePreset} from "./strapi-scripts/content-helpers";

const contentJsonName = './content.json';
const contentJson = require(contentJsonName);

let files = contentJson.files;

addBookIdIfNoneExists(contentJson, contentJsonName);
addUidIfNonePreset(files, contentJson, contentJsonName);
// addChapterTitleIfNonePresent(files, bookJson, bookJsonName);

for (const [x, file] of Object.entries(files) as any){
    if(files[x].subject) {
      console.log('file contains subject')
      for(const [index, subChapter] of Object.entries(files[x].chapters) as any){
        buildBookHTML(subChapter);
        buildArticlesHTML(subChapter);
      }
    }
    else {
      buildBookHTML(file);
      buildArticlesHTML(file)
    }
    
}