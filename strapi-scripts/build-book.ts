const razrooMarkdownEngine = require('@razroo/razroo-markdown-engine').resolveMarkdownFile;
const mkdirp = require('mkdirp')

export function buildBookHTML(chapter) {
  let filePathArray = chapter.path.split("/");
  console.log('chapter %j', chapter)
  console.log('chapter.path %j', chapter.path);
  console.log('filePathArray %j', filePathArray);
  let builtFilePath = `./build/book/${filePathArray.pop()}`;
  builtFilePath = builtFilePath.replace("md", "html");

  mkdirp.sync(builtFilePath.substring(0, builtFilePath.lastIndexOf("/")))
  let filePathWithoutChapterIdInName = 
    `${filePathArray.slice(0, filePathArray.length - 1).join('/')}/${filePathArray[filePathArray.length - 1].substring(9)}`;
  console.log('filePathArray.slice(0, filePathArray.length - 1).join', filePathArray.slice(0, filePathArray.length - 1).join('/'));
  console.log('filePathArray[filePathArray.length - 1].substring(9)', filePathArray[filePathArray.length - 1].substring(9));
  console.log('filePathArray[filePathArray.length - 1]', filePathArray[filePathArray.length - 1]);
  console.log('filePathWithoutChapterIDInName %j', filePathWithoutChapterIdInName);
  razrooMarkdownEngine(`${filePathWithoutChapterIdInName}`, builtFilePath).then((output)=>{
    console.log(output);
  })
}