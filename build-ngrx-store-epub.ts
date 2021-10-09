import { buildEpubBook } from "./strapi-scripts/build-epub";

const bookJsonName = './ngrx-store-book.json';
const bookJson = require(bookJsonName);

const files = bookJson.files;

buildEpubBook(bookJson, files);