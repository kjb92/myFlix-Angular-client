import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})

/**
 * The UserProfileComponent provides the user profile view.
 * Displays user info, the ability to modify user info, or
 * delete the user's account. This is also where a user
 * can view/edit their favorite movies.
 */
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favorites: any[] = [];

  @Input() updatedUser = {
    username: '',
    password: '',
    email: '',
    birthday: null as string | null,
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetch (GET) the user's info with fetchApiData.getUser()
   * @returns an object of the user's info
   */ 
  getUser(): void {
    this.fetchApiData.getOneUser().subscribe((resp: any) => {
      // we set user variable to keep what we get as a response from API call
      this.user = resp;
      // console.log(resp);
      this.updatedUser.username = this.user.username;
      this.updatedUser.email = this.user.email;
      this.updatedUser.birthday = this.datePipe.transform(
        this.user.birthday,
        'yyyy-MM-dd'
      );
      return this.user;
    });
  }

  /**
   * Delete (DELETE) the user's info with fetchApiData.deleteUser()
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account was successfully deleted!', 'OK', {
          duration: 4000,
        });
      });
    }
  }

  /**
   * Update (PUT) the user's info with fetchApiData.editUser()
   */
  updateUserData(): void {
    // Check if the password field is empty
    if (!this.updatedUser.password) {
      this.snackBar.open('Please enter a password', 'OK', {
        duration: 4000,
      });
      return; // Stop execution if password is empty
    }

    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open('User profile was successfully updated', 'OK', {
        duration: 4000,
      });
      localStorage.setItem('user', JSON.stringify(result));
    });
  }
}
