const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')

export async function buildBookHTML(chapter) {
  let filePathArray = chapter.path.split("/");
  let builtFilePath = `./build/book/${chapter.path}`;
  builtFilePath = builtFilePath.replace("md", "html");

  mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
  let filePathWithoutChapterIdInName = 
    `${filePathArray.slice(0, filePathArray.length - 1).join('/')}/${filePathArray[filePathArray.length - 1].substring(9)}`;
  await razrooMarkdownEngine(`${filePathWithoutChapterIdInName}`, builtFilePath).then((output)=>{
    console.log(output);
  })
}