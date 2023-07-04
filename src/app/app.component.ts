import { Component } from '@angular/core';
//Import sign up form
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
//Import login form
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
//Import dialog element from Angular Material
import { MatDialog } from '@angular/material/dialog';
//Import MovieCard component
import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) {}

  //This is the function that will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      //Assigning the dialog a width
      width: '480px',
    });
  }

  //This is the function that will open the dialog when the signup button is clicked
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      //Assigning the dialog a width
      width: '480px',
    });
  }

  //This is the function that will open the movie-card dialog
  openMoviesDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px',
    });
  }
}
