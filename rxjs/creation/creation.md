RxJS Common Creation Operators
==============================

The common RXJS creation operators are:

1.  from

2.  fromEvent

3.  of

from
----

A common scenario when using from, is that you would like to return an
http request, and turn that into an observable. Razroo has a very
opinionated architecture, and we follow through with that architecture
throughout the book. We realize that every scenario may not be able to
follow the ideal architecture. However, let's assume that you are using
three very integral libraries:

1.  GraphQL

2.  Apollo Client

3.  ngrx/store

`from` will be used in a scenario wherein you are trying to convert an
apollo query into an observable,

``` {caption="posts.service.ts"}
getPosts(): Observable<Post[]> {
  const posts$ = this.apollo.query({ query: GetPosts });

  return from(posts$).pipe(pluck('data', 'posts'));
}
```

so that it can be passed into your ngrx/store:

``` {caption="posts.effects.ts"}
@Effect() loadPosts$ = this.dataPersistence.fetch(
  PostsActionTypes.LoadPosts,
  {
    run: (action: LoadPosts, state: PostsPartialState) => {
      return this.postsService.getPosts().pipe(
        map((posts: Post[]) => new PostsLoaded(posts))
      );
    },
    onError: (action: LoadPosts, error) => {
      console.error('Error', error);
      return new PostsLoadError(error);
    }
  }
);
```

fromEvent
---------

Whole `fromEvent` is a common operator in RxJS, I would argue that
within an Angular setting, it is not a common operator. There is truly
no scenario within Angular wherein`fromEvent` makes sense. Instead use
the core Angular even handlers within your template:

``` {caption="user-form.input.ts"}
<button (click)="submitForm()">
```

``` {caption="user-form.component.ts"}

submitForm(userData: User) {
  this.userFormFacade.submitForm(userData);
}
```

of
--

`of` while similar in purpose to of, will convert a value to an
observable. However, the main difference between the two, can be seen
here in this snipper of code:

    // the subscribe here, will emit all of the data at once  
    // [1, 2, 3]
    Observable.of([1, 2, 3]).subscribe(x => console.log(x));  

    // the subscribe here, will iterate through data one at a time
    Observable.from([1, 2, 3]).subscribe(x => console.log(x));  
    // 1
    // 2
    // 3

`from` for the most part is preferabble, as data will usually be
contained in an array, and `from` sidesteps the need of tapping into the
array, doing something like this:

    console.log(data[0]);

From my personal experience, `of` becomes invaluable when it comes to
mocking data within your unit tests. For instance, doing something such
as the following:

    const postMock = {
      id: '123',
      title: 'test title',
      featureImage: 'sample feature image',
      created_at: '2019-08-05T07:49:11.405Z' 
    }

    const postMock$ = of(postMock);

This is the most efficient solution is this scenario for mocking data,
and comes up quite frequently within your app, and something to be aware
of.
