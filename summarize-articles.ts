const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const fs = require('fs');
const axios = require('axios');
const articlesJsonName = './articles.json';
const articlesJson = require(articlesJsonName);
import { readFileSync, writeFileSync } from 'fs';

let files = articlesJson.files;

// for (let x in files) {
    let stagingPath = `./staging/articles/es/${files[0].path.split("/").pop()}`;
    let fileString = readFileSync(files[0].path).toString();

    mkdirp.sync(stagingPath.substring(0, stagingPath.lastIndexOf("/")))
    writeFileSync(stagingPath, response.data.translations[0].text);
    // razrooMarkdownEngine(response.data.translations[0].text, builtFilePath).then((output)=>{
    //   console.log(output);
    // });

// }
  