import {parse} from "node-html-parser";
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

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
  });
}

export function addIdToArticlesJson(files, articlesJson, articlesJsonName, angularArticle) {
  articlesJson.files = articlesJson.files.map(file => {
    if(file.UID === angularArticle.UID) {
      file.id = angularArticle.id
    }
    return file;
  });

  fs.exists(articlesJsonName, function (exists) {
    if(exists) {
      fs.writeFile(path.join(__dirname, articlesJsonName), JSON.stringify(articlesJson, null, 2), (err) => {
        if (err) return console.log(err);
      });
    }
    else {
      console.log('file does not exist');
    }
  });

}
