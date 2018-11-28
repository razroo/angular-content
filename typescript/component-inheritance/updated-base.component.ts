@Component({
  template: ''
})
export class BaseComponent {
    protected utilitiesService: UtilitiesService;
    protected loggingService: LoggingService;

constructor() {
        // Manually retrieve the dependencies from the injector
        // so that constructor has no dependencies that must be passed in from child
        const injector = AppInjector.getInjector();
        this.utilitiesService = injector.get(UtilitiesService);
        this.loggingService = injector.get(LoggingService);
        this.logNavigation();
    }

    protected logError(errorMessage: string) { . . . }    
    private logNavigation() { . . . }
}
