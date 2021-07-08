const Epub = require("epub-gen");
const fs = require('fs');
const bookJsonName = './book.json';
const bookJson = require(bookJsonName);
import {parse} from "node-html-parser";
const files = bookJson.files;

let content = [];
let unitTestingArr = files.filter(file => file.title !== "Unit Testing");

for (let x in  unitTestingArr) {
  let builtFilePath = `./build/book/${files[x].path.split("/").pop()}`;
  builtFilePath = builtFilePath.replace("md", "html");
  let htmlFileString = fs.readFileSync(builtFilePath, "utf-8");
  let contentString = parse(htmlFileString); 
  contentString.querySelector('h1').remove();
  let modifiedContentString = contentString.toString();

  content.push({
      title: files[x].title,
      data: modifiedContentString
  });
}

const options = {
    title: "Angular: The Full Gamut - Unit Testing", // *Required, title of the book.
    author: "Charlie Greenman", // *Required, name of the author.
    publisher: "Razroo", // optional
    cover: "assets/angular-the-full-gamut-unit-testing-cover.jpg", // Url or File path, both ok.
    content: content,
    output: './build/epub/angular-unit-testingtitvl.epub'
};

new Epub(options).promise.then(
    () => console.log("Ebook Generated Successfully!"),
    err => console.error("Failed to generate Ebook because of ", err)
);