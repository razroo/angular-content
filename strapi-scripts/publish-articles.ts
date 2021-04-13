// this is the strapi schema to follow
// We are going to use a UUID generated by the content repo to target articles
// We are also going to pull in the id returned by Strapi, and updated UID. If UID and ID are present, it means
// that article has been created already and should be updated only.
const fs = require('fs');
const articlesJsonName = '../articles.json'
const articlesJson = require(articlesJsonName);

import { execute, makePromise } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const uri = 'http://localhost:1337/graphql';
const headers = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE4MzA4MTA0LCJleHAiOjE2MjA5MDAxMDR9.N8GrCYV_S0kzAgwMgh4jqB5dtY3F765heyvOe7HUuEo"
}
const link = createHttpLink({ uri, fetch, headers});

function readArticlesJson() {
  let filePath;
  let files = articlesJson.files;
  for(let file in files) {
    filePath = `./build/articles/${files[file].path.split("/").pop()}`;
    filePath = filePath.replace("md", "html");
    const UID = files[file].UID;
    const articleTitle = getHtmlArticleFileTitle(filePath);
    createStrapiArticle(UID, articleTitle);
  }
}

function getHtmlArticleFileTitle(filePath) {
  const htmlFileString = fs.readFileSync(filePath, "utf8");
  const root = parse(htmlFileString);
  return root.querySelector('h1').text.toString();
}

readArticlesJson();

export function createStrapiArticle(UID: string, articleTitle: string) {

  const query = gql`
    mutation CreateAngularArticle($input: createAngularArticleInput) {
      createAngularArticle(input: $input) {
        angularArticle {
          id
          Title
          author {
            firstName
            lastName
          }
          UID
        }
     }
   }
  `

  const variables = {
    input: {
      data: {
        Title: articleTitle,
        Description: "test description",
        author: 1,
        UID: UID,
        Content: "test 123",
        published_at: "2019-12-03T10:15:30Z",
        created_by: 1,
        updated_by: 1,
     }
   }
 }

  const operation = {
    query,
    variables
  }

  const handlers = {
    next: (data) => {
      console.log(`received data: ${Date.now()}, ${JSON.stringify(data, null, 2)}`);
    },
    error: error => console.log(`received error ${error}`),
    complete: () => console.log('complete'),
  };

  execute(link, operation).subscribe(handlers);
}

