import gql from "graphql-tag";
import {execute} from "apollo-link";

export function updateStrapiArticle(UID: string, articleTitle: string, articleContent: string, files, id, link) {
    const query = gql`
        mutation UpdateAngularArticle($input: createAngularArticleInput) {
            updateAngularArticle(input: $input) {
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
      where: {
        id: id
      },
      data: {
        Title: articleTitle,
        Description: "Angular: The Full Gamut Edition",
        author: 1,
        UID: UID,
        Content: articleContent,
        created_by: 1,
        updated_by: 1,
      }
    }
  }

  const operation = {
    query,
    variables
  }

  execute(link, operation).subscribe(data => {

  });
}
