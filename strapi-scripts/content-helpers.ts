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

export function addUidAndBookIdIfNonePreset(chapters: any, articlesJson, articlesJsonName) {
  try {
    for(const chapter of chapters){
      if(!chapter.id) {
        chapter.id = uuidv4().replace("-","").substring(0,8);
      }
      if(!chapter.bookId) {
        chapter.bookId = articlesJson.id;
      }
      if(chapter.path){
        let filePathArray = chapter.path.split('/');
        let fileName = filePathArray[filePathArray.length - 1];
        if (fileName.substring(0,8) != chapter.id) {
          chapter.path = `${filePathArray.slice(0, filePathArray.length - 1).join('/')}/${chapter.id}-${fileName}`
        }
        console.log('updated chapter %j', chapter);
      }
      else {
        chapter.path = 'test/test.tt';
        console.log('chapter %j', chapter);
      }
    }
  }
  finally {
    fs.writeFile(articlesJsonName, JSON.stringify(articlesJson, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });
  }
}

export function addChapterTitleIfNonePresent(files, articlesJson, articlesJsonName) {
  let filePath;

  for(let file in files){
    let fileObject = files[file];
    filePath = `./build/book/${files[file].path.split("/").pop()}`;
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

export function addBookIdIfNoneExists(articlesJson, articlesJsonName) {
  if(!articlesJson.id) {
    articlesJson["id"] = uuidv4().replace("-","").substring(0,8);

    fs.writeFile(articlesJsonName, JSON.stringify(articlesJson, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });
  }
}

export function addIdToArticlesJson(files, articlesJson, articlesJsonName, article) {
  const idArr =  article.id.split('-');
  const id = idArr[idArr.length - 1];

  articlesJson.files = articlesJson.files.map(file => {
    if(file.id === id) {
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
