import { buildEpubBook } from "./strapi-scripts/build-epub";
const bookJsonName = './unit-testing-book.json';
const bookJson = require(bookJsonName);

const files = bookJson.files;

buildEpubBook(bookJson, files);