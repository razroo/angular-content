import {addBookIdIfNoneExists, addChapterTitleIfNonePresent} from "./strapi-scripts/content-helpers";
// TOOD modify folder name from strapi-scripts to content-scripts
import {addUidIfNonePreset} from "./strapi-scripts/content-helpers";

const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const contentJsonName = './content.json';
const contentJson = require(contentJsonName);
const articlesJsonName = './articles.json';
const articlesJson = require(articlesJsonName);
const fs = require('fs');

let files = contentJson.files;
let articleFiles = articlesJson 

// addBookIdIfNoneExists(contentJson, contentJsonName);
addUidIfNonePreset(files, contentJson, contentJsonName);
// addChapterTitleIfNonePresent(files, bookJson, bookJsonName);

try {
    for (const articleFile of articleFiles.files as any){
        for (const [x, file] of Object.entries(files) as any){
            let builtFilePath;
            if(files[x].subject) {
              for(const [index, subChapter] of Object.entries(files[x].chapters) as any){
                if(articleFile.path === subChapter.path)  {
                    subChapter.UID = articleFile.UID;
                    subChapter.article = true;
                    subChapter.articleId = articleFile.id;
                    console.log(articleFile.path)
                }
              }
            }
            else {
                if(articleFile.path === files[x].path)  {
                    files[x].UID = articleFile.UID;
                    files[x].article = true;
                    files[x].articleId = articleFile.id;
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
