---
title: RxJS and Facades
---

The point of this Chapter
-------------------------

This entire chapter, is going to discuss how you can create your own
\"light\" internal state using RxJS and Facades. However, the point of
this is to make you strongly consider using Ngrx/store in the first
place without using Facades + RxJS. In addition to this, proving to the
developer and create an internal service for a component that interacts
with an http service likewise should use ngrx/store.

I think this is important to read through, because there is going to be
a time in your career already, where you have decided,
/lstinlinengrx/store might be too much for what you are working on.
Likewise the point of this article is to push back on that urge, and how
ngrx/store will actually the decrease the time it takes to build the
application long term.

Recap on the Facade Pattern
---------------------------

I would like to present the facade pattern in the way that I first
learned how to do so. There is a fundamental book on computer science
called \"Design Patterns: Elements of Re-usable Object-Oriented
Software\" otherwise known as the GoF(Gang of Four) book due to it's
four authors. It's a bit of classic in software, and I would say
analogous to, \"How to Win Friends and Influence People\" by Dale
Carnegie, if you are familiar. In the GoF book, it discusses the idea of
the facade pattern.

Paraphrasing it:

1.  Implements a singular interface that contains multiple interfaces.
    Those interfaces work through the singular interface.

    1.  This helps readability by making the name more straight to the
        point. For instance, in our scenario, `UpdateTodo`, vs.
        `this.store.dispatch(new TodoUpdated(TodoPayload))`.

    2.  Usability by removing need of dependencies, and truncated form
        of functionality. For instance, in our scenario, we are using
        `UpdateTodo`, there is no need to include dependency for store.
        In addition, developer can now just type in `UpdateTodo` instead

2.  Provide context specific interface. This is non relevant within an
    ngrx setting, as front end services by default, without state, is
    generally very, very specific.

3.  Serve as a launching point for a broader re-factor, or a tightly
    coupled system, in favor a more loosely coupled code. For instance,
    in our scenario, by tying all of our state underneath a singular
    facade, if at a later date we want to swap out the tech needed to
    manage state, we can do that by simple changing the logic within a
    particular location.

Recap: Ngrx/store + Facades
---------------------------

Just to re-iterate, let's say that we have a todo app, and we create a
`todo.facade.ts` file:

``` {caption="todo.facade.ts"}
@Injectable({})
class TodoFacade {
  constructor(private store: Store<any>) {}

  todos$: Observable<Todo[]> = this.store.pipe(select(getTodos));
  idOfTodos$: Observable<Todo[]> = this.store.pipe(select(getTodosIds));
  loaded$: Observable<boolean> = this.store.pipe(select(getTodosLoading));

  UpdateTodo(TodoPayload): void {
    this.store.dispatch(new TodoUpdated(TodoPayload));
  }
}  
```

Our facade within an ngrx/store setting is doing three unique things.

1.  Handling the store constructor for us. (With regards to unit testing
    this makes life alot easier.)

2.  Allows us to have to only put selector in one location(our facade),
    and trickle it down to all other areas.

3.  Create a simpler to use interface for our actions, that can be
    re-used time and time again. Especially if we decide to change the
    logic, or dynamics of how action works, we only have to update in
    one particular area.

Progressing Idea of Facades over to RxJS
----------------------------------------

Similarly, the idea of facades is incredibly valuable within RxJs. Let's
imagine the most heavily used RxJS use case(atleast the most heavily
used one I've come across). Perhaps, because there isn't a single
application that doesn't use it, \"Search\".

Some of the business use cases with our particular company search
includes:

1.  Search by typing text into search bar(let's say here searching for
    companies)

2.  Route between search, company, or company details view

3.  Company details

Our particular RxJS code

``` {caption="search-companies.component.ts"}
@Component({
  selector: 'search-companies',
  templateUrl: './search-companies.component.html',
  styleUrls: ['./search-companies.component.scss']
})
export class SearchCompaniesComponent implements OnInit {
  companies$: Observable<Company[]>;
  searchCriteria = new FormControl();

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    // Observable stream to input control values
    const searchBy$ = this.searchTerm.valueChanges;
    
    this.companies$ = searchBy$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(''),      
      switchMap((criteria:string) => {
        const request$ = this.companyService.searchCompanies(criteria);
        return !criteria.length ? of([]) : request$          
      })
    );
  }
}  
```

Let's dissect our RxJS code:

1.  `debounceTime(300)` - Only after 300 milliseconds, will the request
    go through. If the user decides to type once again, within 300
    milliseconds, the 300 millisecond count time, restarts again.

2.  `distinctUntilChanged()` - Let's say the string the user inputs is
    \"Apple\". Then they decide to delete the e \"Appl\", but then add
    it again, \"Apple\", this will not trigger the http request. This is
    because, this is the exact same word that it was initially.

3.  `startWith('')` - Not completely necessary, but will make sure that
    is an empty string everytime we initialize this page again.

4.  `switchMap` - Powerful, because it has an internal project function,
    which allows us to break from the observables and use our
    \"transformed\" value. Here we are passing it to the service, which
    calls our compnayService, based on search criteria user passed in.

Addressing Architectural Concerns in Above Code
-----------------------------------------------

### Concern One - Business Logic in View Layer

Obviously the logic here is contained within the view layer of the
actual component. Best practices dictate, logic pertaining to view
itself should be contained within component. Business logic, such as
here, pertaining to when the service should fire should be moved to a
different service.

### Concern Two - State 

Primarily around caching. In addition, updating the search criteria. For
instance, if we want to search our application by companies, use one
service. If we want to search by CEO's, then another function for CEOs.
If we want to use another search criteria, let's say a particular
category, then we will need another facade for controlling that. This
ends up having alot of internal logic, and it greatly simplifies our
app, by having the state be external. Especially, if would like to
separate search from the data-table. Having the logic be re-usable, and
be able to be used in multiple places, is useful.

Creating State Using RxJS
-------------------------

I would like to jump straight to this one. I don't want to jot down here
the interface, rather the internal logic that we can create withing our
SearchFacade. It would look something like this:

``` {caption="company-search.facade.ts"}
export enum CompanySearchActionTypes {
  UPDATE_CRITERIA = 'Update Search Criteria',
  UPDATE_RESULTS = 'Update Search Results'
}

export interface SearchAction {
  readonly type: SearchActionTypes;
  readonly payload: SearchCriteria | SearchResult[];
}

export class CompanySearchFacade {
  searchResults$: Observable<SearchResult[]> = this.dispatch
    .asObserable() 
    .pipe(map(state => state.companies), startWith([] as SearchResult[]));

  searchCriteria$ = Observable<SearchCriteria> = this.dispatch.asObservable().pipe(map(state => state.criteria)
  ) 

  constructor(private companyService: CompanyService, private userService: UserService)
    
  searchCompanies(companyName: string): Observable<SearchResult[]> {
    // more code potentially goes here
    pendingCompanies$.subscribe(companies => {
      connst type = SearchActionTypes.UPDATE_RERULTS;
      const action = { payload: tickets, type};
      this.dispatch.next(
        (this.state = reduce(this.state, action))
      );
    });
  }

  updateCompanyCriteria(companyName: string, categoryName: string) {
    const type = SearchActionTypes.UPDATE_CRITERIA;
    const payload = { user, ticket };
    const state = reduce(this,state, {type, payload});

    this.dispatch.next((this.state = state));
  }
}  

function reduce(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case SearchActionTypes.UPDATE_CRITERIA: return {
      ...state,
      criteria: action.payload as SearchCriteria
    };
    case SearchActionTypes.UPDATE_RESULTS: return {
      ...state,
      companies: action.payload as SearchResult[]
    }
  }
}
```

Don't think too much into the above code. However, what we've proven is
that we can maintain a relatively simple store within our Facade simply
using RxJS. That being said, I would like to make the following case for
not doing the above and sticking with ngrx/store.

Why you should stick to ngrx/store
----------------------------------

The assumption with doing the above, is that the code is light enough,
to where we don't need to use ngrx/store. However, let's say within our
code, we want to create a general company. Here we sort of move
companies over to a cart of sorts, where we can then move these
companies over an analytics platform. Here, we would be able to combine
search, and our product cart under one store. Using the above facade, it
would fracture our store between many different things. We might:

1.  Want to create an ngrx/effect, so that whenever a user searches, it
    resets the product cart(who knows, maybe product wants it).

2.  We want to modify our data to use ngrx/entity.

3.  Maybe we want a history of all searches, to be used for internal
    analytics periodically.

4.  Our reducers and actions bloat out of control, wherein it makes
    sense to put them into two separate files. While we are at it, we
    might as well be using state.

5.  We have similar state logic elsewhere(let's say for our influencer
    search), and want to use that our company logic as well. It might be
    easier to keep them all in the same sort of structure.

6.  It might make our code more brittle. Who's to say now that we have
    ngrx/store and rxjs/facades, that the team won't break up into more
    patterns. For instance, a one-off internal service?

For this reason, and many others, once you are building an enterprise
application, it makes sense to use ngrx/store.

`I’ve worked with many startups, and I’ve seen them work really quickly with ngrx/store as well. When done correctly, I would argue that ngrx/store speeds up team development, due to it’s cookie cutter style of front end architecture`
