const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const bookJsonName = './book.json';
const bookJson = require(bookJsonName);
const fs = require('fs');
const axios = require('axios');

let files = bookJson.files;

// for (let x in files){
//     let builtFilePath = `./build/book/${files[x].path.split("/").pop()}`;
//     builtFilePath = builtFilePath.replace("md", "html");

//     mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
//     razrooMarkdownEngine(files[x].path, builtFilePath).then((output)=>{
//       console.log(output);
//     })
// }


axios({
  method: 'post',
  url: 'https://api-free.deepl.com/v2/translate?auth_key=',
  params: {
    source_lang: 'EN',
    target_lang: 'ES',
    text: 'hello',
  }
}).then(response => {
    console.log('response');
    console.log(response.data.translations[0].text);
  }).catch(error => {
    console.log('error');
    console.log(error);
  });
  