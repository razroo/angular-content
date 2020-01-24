import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { AuthGroup } from '../models/authorization.types';

@Directive({
    selector: '[myDisableIfUnauthorized]'
})
export class MyDisableIfUnauthorizedDirective implements OnInit {
    @Input('myDisableIfUnauthorized') permission: AuthGroup; // Required permission passed in
    constructor(private el: ElementRef, private authorizationService: AuthorizationService) { }
    ngOnInit() {
        if (!this.authorizationService.hasPermission(this.permission)) {
              this.el.nativeElement.disabled = true;
        }
    }
}
