 Unit Testing State 
===================

Testing state can be a grueling process.

You'll need to create a module for state, then inject appropriate data
that you expect from the store. Within our recommended Facade
architecture, this problem is already alleviated.

Why?

Because the store is located within our facade, we can simply provide it
with an empty object. When we end up using the facade within our
components, the injected store never even makes it's way through,
because it is mocked out. Therefore it never becomes more complicated
than this.

    describe('UserFacade', () => {
      let facade: UserFacade;
      let store: Store<any>;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            UserFacade,
          ],
        });

        facade = TestBed.get(UserFacade);

        store = TestBed.get(Store);
        spyOn(store, 'dispatch');
      });
