const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')
const fs = require('fs');
const axios = require('axios');
const articlesJsonName = './articles.json';
const articlesJson = require(articlesJsonName);
const SummarizerManager = require("node-summarizer").SummarizerManager;
import { readFileSync, writeFileSync } from 'fs';

let files = articlesJson.files;
let path = "unit-testing/marble-unit-testing/marble-unit-testing.md"

// for (let x in files) {
    let builtFilePath = `./build/articles/summary/${path.split("/").pop()}`;
    let fileString = readFileSync(path).toString();

    const Summarizer = new SummarizerManager(fileString,5);
    let summary = Summarizer.getSummaryByFrequency().summary;
    Summarizer.getSummaryByRank().then((summary_object)=>{
        console.log('summary');
        console.log(summary_object.summary);

        mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
        writeFileSync(builtFilePath, summary);
    })

    

    
    // razrooMarkdownEngine(response.data.translations[0].text, builtFilePath).then((output)=>{
    //   console.log(output);
    // });

// }
  