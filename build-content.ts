import { buildArticlesHTML } from "./strapi-scripts/build-articles";
import { buildBookHTML } from "./strapi-scripts/build-book";
import {addBookIdIfNoneExists, addChapterTitleIfNonePresent} from "./strapi-scripts/content-helpers";
// TOOD modify folder name from strapi-scripts to content-scripts
import {addUidAndBookIdIfNonePreset} from "./strapi-scripts/content-helpers";

const contentJsonName = './content.json';
const contentJson = require(contentJsonName);

let chapters = contentJson.chapters;

addBookIdIfNoneExists(contentJson, contentJsonName);
addUidAndBookIdIfNonePreset(chapters, contentJson, contentJsonName);
// addChapterTitleIfNonePresent(chapters, bookJson, bookJsonName);

for (const file of chapters){
  buildBookHTML(file);
  buildArticlesHTML(file);
}