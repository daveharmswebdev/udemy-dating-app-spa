import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegistration = new EventEmitter<boolean>();

  constructor(
    private auth: AuthService,
    private alert: AlertifyService
  ) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.model).subscribe(
      () => this.registrationSuccessHandler(),
      error => this.alert.error(error)
    );
  }

  cancel() {
    this.cancelRegistration.emit(false);
  }

  registrationSuccessHandler() {
    this.alert.success('You are registered!');
    this.model = {};
  }

}
