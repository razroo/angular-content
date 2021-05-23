import {parse} from "node-html-parser";
import slugify from "slugify";
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

    if(!fileObject.UID) {
      fileObject["UID"] = uuidv4().replace("-","").substring(0,8);
    }
  }
  fs.writeFile(articlesJsonName, JSON.stringify(articlesJson, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
}

export function addChapterTitleIfNonePresent(files, articlesJson, articlesJsonName) {
  let filePath;

  for(let file in files){
    let fileObject = files[file];
    filePath = `./build/articles/${files[file].path.split("/").pop()}`;
    filePath = filePath.replace("md", "html");

    const articleTitle = getHtmlArticleFileTitle(filePath);

    if(!fileObject.title) {
      fileObject["title"] = articleTitle;
    }
  }
  fs.writeFile(articlesJsonName, JSON.stringify(articlesJson, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
  });
}

export function addIdToArticlesJson(files, articlesJson, articlesJsonName, article) {
  const UIDArr =  article.UID.split('-');
  const UID = UIDArr[UIDArr.length - 1];

  articlesJson.files = articlesJson.files.map(file => {
    if(file.UID === UID) {
      file.id = article.id
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
