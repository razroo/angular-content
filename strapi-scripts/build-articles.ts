const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')

export async function buildArticlesHTML(chapter) {
    if(chapter.article) {
        let filePathArray = chapter.path.split("/");
        let fileName = filePathArray[filePathArray.length - 1];
        let builtFilePath = `./build/articles/${fileName}`;
        builtFilePath = builtFilePath.replace("md", "html");

        mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
        let filePathWithoutChapterIdInName = 
          `${filePathArray.slice(0, filePathArray.length - 1).join('/')}/${fileName.substring(9)}`
        await razrooMarkdownEngine(filePathWithoutChapterIdInName, builtFilePath).then((output)=>{
            console.log(output);
        })
    }
    
}