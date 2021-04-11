// this is the strapi schema to follow 

mutation CreateAngularArticle {
  createAngularArticle(input: {data: {
    Title: "test",
      Description: "test description",
      author: 1,
      UID: "d520ea41-57b2-4375-b167-0ecfa225013d",
      Content: "test 123",
      published_at: "2019-12-03T10:15:30Z",
      created_by: 1,
      updated_by: 1,
  }
  }) {
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
