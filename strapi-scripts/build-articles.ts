const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')

export function buildArticles(chapter): void {
    if(chapter.article) {
        let builtFilePath = `./build/articles/${chapter.path.split("/").pop()}`;
        builtFilePath = builtFilePath.replace("md", "html");

        mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
        razrooMarkdownEngine(chapter.path, builtFilePath).then((output)=>{
            console.log(output);
        })
    }
    
}