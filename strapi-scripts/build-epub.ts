import slugify from 'slugify';
const Epub = require("epub-gen");
const fs = require('fs');
import {parse} from "node-html-parser";

export function aggregateEpubContent(files) {
  let content = [];
  try {
    for (let x in  files) {
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
  }
  finally {
    return content;
  } 
}

export function createOptions(contentJson, files) {
  let content = aggregateEpubContent(files);

  const options = {
    title: `Angular: The Full Gamut - ${contentJson.subject}`, // *Required, title of the book.
    author: contentJson.author, // *Required, name of the author.
    publisher: contentJson.publisher, // optional
    cover: "assets/angular-the-full-gamut-state-management-cover.jpg", // Url or File path, both ok.
    content: content,
    output: `./build/epub/${slugify(contentJson.subject)}.epub`
  };

  return options;
}

export function buildEpubBook(contentJson, files) {
  let options;
  try {
    options = createOptions(contentJson, files);
  }
  finally {
    console.log('options');
    console.log(options);
    new Epub(options).promise.then(

      () => console.log(`${options.title} Ebook Generated Successfully!`),
      err => console.error("Failed to generate Ebook because of ", err)
    );
  }
  
}


