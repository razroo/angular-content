@Component({
    template: ''
})
export class BaseComponent {

    constructor(protected utilitiesService: UtilitiesService,
        protected loggingService: LoggingService) {
        this.logNavigation();
    }

    protected logError(errorMessage: string) { . . .}
    private logNavigation() { . . .}
}
