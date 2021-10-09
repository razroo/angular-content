const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')

export function buildBookHTML(chapter) {
  let builtFilePath = `./build/book/${chapter.path.split("/").pop()}`;
  builtFilePath = builtFilePath.replace("md", "html");

  mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
  razrooMarkdownEngine(chapter.path, builtFilePath).then((output)=>{
    console.log(output);
  })
}