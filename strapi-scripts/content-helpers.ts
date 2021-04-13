import {parse} from "node-html-parser";
const fs = require('fs');

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
