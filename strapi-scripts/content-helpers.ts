import {parse} from "node-html-parser";
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

export function getHtmlArticleFileTitle(filePath) {
  const htmlFileString = fs.readFileSync(filePath, "utf8");
  const root = parse(htmlFileString);
  return root.querySelector('h1').text.toString();
}

export function getHtmlArticleFileContent(filePath) {
  const htmlFileString = fs.readFileSync(filePath, "utf8");
  const root = parse(htmlFileString);
  root.querySelector('h1').remove();
  return root.toString();
}

export function addUidIfNonePreset(files, articlesJson, articlesJsonName) {
  for(let file in files){
    let fileObject = files[file];

    if(fileObject.UID) {
      return;
    }
    else {
      fileObject["UID"] = uuidv4();
    }
  }
  fs.writeFile(articlesJsonName, JSON.stringify(articlesJson, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(articlesJson));
    console.log('writing to ' + articlesJsonName);
  });
}

export function addIdToArticlesJson(files, articlesJson, articlesJsonName, angularArticle) {
  console.log('articlesJson before')
  console.log(JSON.stringify(articlesJson, null, 2));

  articlesJson.files = files.map(file => {
    if(file.UID === angularArticle.UID) {
      file.id = angularArticle.id
    }
    return file;
  });

  console.log('articlesJson after')
  console.log(JSON.stringify(articlesJson, null, 2));

  fs.writeFile(articlesJsonName, JSON.stringify(articlesJson, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing to ' + articlesJsonName);
  });
}
