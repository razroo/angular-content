const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const fs = require('fs');
const axios = require('axios');
const articlesJsonName = './articles.json';
const articlesJson = require(articlesJsonName);
const SummarizerManager = require("node-summarizer").SummarizerManager;
import { readFileSync, writeFileSync } from 'fs';

let files = articlesJson.files;

// for (let x in files) {
    let builtFilePath = `./build/articles/summary/${files[0].path.split("/").pop()}`;
    let fileString = readFileSync(files[0].path).toString();

    const Summarizer = new SummarizerManager(fileString,3);
    Summarizer.getSummaryByRank().then((summary_object)=>{
        console.log('summary');
        console.log(summary_object.summary);

        mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
        writeFileSync(builtFilePath, summary_object.summary);
    })

    

    
    // razrooMarkdownEngine(response.data.translations[0].text, builtFilePath).then((output)=>{
    //   console.log(output);
    // });

// }
  