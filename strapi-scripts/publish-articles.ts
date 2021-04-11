// this is the strapi schema to follow
// We are going to use a UUID generated by the content repo to target articles
// We are also going to pull in the id returned by Strapi, and updated UID. If UID and ID are present, it means
// that article has been created already and should be updated only. 

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
