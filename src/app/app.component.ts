import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from './shared/services/alert.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    messageText: string;
    message: any;

    constructor(private alertService: AlertService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        this.toastr.success(message.text);
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        this.messageText = typeof (message.text) == 'string' ? message.text : message.text.error.message;
                        this.toastr.error(this.messageText);
                        break;
                }
                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
