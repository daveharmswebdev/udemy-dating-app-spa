import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    private auth: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  get unique_name() {
    return (this.auth.decodedToken && this.auth.decodedToken.unique_name) || 'User';
  }

  login() {
    console.log(this.model);
    this.auth.login(this.model).subscribe(
      data => {
        this.alertify.success(data)
        this.model = {};
      },
      error => this.alertify.error(error)
    );
  }

  logout() {
    this.auth.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('You have logged out.');
  }

  loggedIn() {
    return this.auth.loggedIn();
  }
}
