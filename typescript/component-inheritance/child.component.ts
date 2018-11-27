@Component({ . . . })

    export class ChildComponent extends BaseComponent {

    constructor(private childDataService: ChildDataService,

    utilitiesService: UtilitiesService,

                  loggingService: LoggingService) {

    super(utilitiesService, loggingService);

      }

    }    
