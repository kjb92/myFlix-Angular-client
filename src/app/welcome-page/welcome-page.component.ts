import { Component, OnInit } from '@angular/core';
//Import sign up form
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
//Import login form
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
//Import dialog element from Angular Material
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
