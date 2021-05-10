// this is the strapi schema to follow
// We are going to use a UUID generated by the content repo to target articles
// We are also going to pull in the id returned by Strapi, and updated UID. If UID and ID are present, it means
// that article has been created already and should be updated only.
import {addIdToArticlesJson, getHtmlArticleFileContent, getHtmlArticleFileTitle} from "./content-helpers";

const articlesJsonName = '../articles.json'
const articlesJson = require(articlesJsonName);

import { execute, makePromise } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import fetch from 'node-fetch';
import {updateStrapiArticle} from "./update-article";
import slugify from "slugify";

const uri = 'http://localhost:1337/graphql';
const headers = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE4MzQyMzg4LCJleHAiOjE2MjA5MzQzODh9.slz2UZMGOWZAaKPrHce9KnpjwZPFXKG0ghOB3HMVll4"
}
const link = createHttpLink({ uri, fetch, headers});

function readArticlesJson() {
  let filePath;
  let files = articlesJson.files;
  for(let file in files) {
    filePath = `./build/articles/${files[file].path.split("/").pop()}`;
    filePath = filePath.replace("md", "html");
    const id = files[file].id
    const UID = files[file].UID;
    const articleTitle = getHtmlArticleFileTitle(filePath);
    const articleContent = getHtmlArticleFileContent(filePath)
    // if id present, it means file has already been created
    if(id) {
      updateStrapiArticle(UID, articleTitle, articleContent, files, id, link);
    }
    else {
      createStrapiArticle(UID, articleTitle, articleContent, files);
    }



  }
}

readArticlesJson();

// due to addition of UID, build will fail if UID is aleady present
export function createStrapiArticle(UID: string, articleTitle: string, articleContent: string, files) {
  const query = gql`
    mutation CreateArticle($input: createArticleInput) {
      createArticle(input: $input) {
        article {
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
        Description: "Angular: The Full Gamut Edition",
        author: 1,
        UID: `${slugify(articleTitle.toLowerCase())}-${UID}`,
        Content: articleContent,
        created_by: 1,
        updated_by: 1,
        category: 2
     }
   }
 }

  const operation = {
    query,
    variables
  }

  // const handlers = {
  //   next: (data) => {
  //
  //   },
  //   error: error => console.log(`received error ${error}`),
  //   complete: () => console.log('complete'),
  // };

  execute(link, operation).subscribe(data => {
    let article = data.data.createArticle.article;

    addIdToArticlesJson(files, articlesJson, articlesJsonName, article);
  });
}

