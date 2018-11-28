@Component({ . . . })
export class ChildComponent extends BaseComponent {
  constructor(private childDataService: ChildDataService) {
     super();
  }
}
