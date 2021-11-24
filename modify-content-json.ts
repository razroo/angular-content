import {addBookIdIfNoneExists, addChapterTitleIfNonePresent} from "./strapi-scripts/content-helpers";
// TOOD modify folder name from strapi-scripts to content-scripts
import {addUidAndBookIdIfNonePreset} from "./strapi-scripts/content-helpers";

const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const contentJsonName = './content.json';
const contentJson = require(contentJsonName);
const articlesJsonName = './articles.json';
const articlesJson = require(articlesJsonName);
const fs = require('fs');

let chapters = contentJson.chapters;
let articleFiles = articlesJson 

// addBookIdIfNoneExists(contentJson, contentJsonName);
addUidAndBookIdIfNonePreset(chapters, contentJson, contentJsonName);
// addChapterTitleIfNonePresent(chapters, bookJson, bookJsonName);

try {
    for (const articleFile of articleFiles.chapters as any){
        for (const [x, file] of Object.entries(chapters) as any){
            let builtFilePath;
            if(chapters[x].subject) {
              for(const [index, subChapter] of Object.entries(chapters[x].chapters) as any){
                if(articleFile.path === subChapter.path)  {
                    subChapter.UID = articleFile.UID;
                    subChapter.article = true;
                    subChapter.articleId = articleFile.id;
                    console.log(articleFile.path)
                }
              }
            }
            else {
                if(articleFile.path === chapters[x].path)  {
                    chapters[x].UID = articleFile.UID;
                    chapters[x].article = true;
                    chapters[x].articleId = articleFile.id;
                    console.log(articleFile.path)
                }
            }
            
        }
    }
}
finally {
fs.writeFile(contentJsonName, JSON.stringify(contentJson, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
});
}
