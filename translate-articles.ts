const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const bookJsonName = './book.json';
const bookJson = require(bookJsonName);
const fs = require('fs');
const axios = require('axios');
import { readFileSync } from 'fs';

let files = bookJson.files;

// for (let x in files){
    // let builtFilePath = `./build/book/${files[0].path.split("/").pop()}`;
    // let fileToBeBuilt = builtFilePath.replace("md", "html");
    let fileString = readFileSync(files[0].path).toString();

    console.log('builtFilePath');
    console.log(fileString);

    axios({
      method: 'post',
      url: 'https://api-free.deepl.com/v2/translate?auth_key=',
      params: {
        source_lang: 'EN',
        target_lang: 'ES',
        text: fileString,
      }
    }).then(response => {
        console.log('response');
        console.log(response.data.translations[0].text);
      }).catch(error => {
        console.log('error');
        console.log(error);
      });

    // razrooMarkdownEngine(files[x].path, builtFilePath).then((output)=>{
    //   console.log(output);
    // })
// }
  