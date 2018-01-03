var chokidar = require('chokidar');
var shell = require('shelljs');

shell.exec('pdflatex main.tex');

chokidar.watch('**/*.tex').on('all', (event, path) => {
  shell.exec('pdflatex main.tex');
  console.log(event, path);
});
