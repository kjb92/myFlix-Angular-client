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

/**
 * The WelcomePageComponent is the default view if the user is not logged in.
 * It displays a welcome message, a log in button, and a register button
 */
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {}

  /**
   * Open the user registration dialog modal displaying input fields for user creation
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Open the user login dialog modal displaying input fields for user login
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
