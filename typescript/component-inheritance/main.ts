platformBrowserDynamic().bootstrapModule(AppModule).then((moduleRef) => {
   AppInjector.setInjector(moduleRef.injector);
});
