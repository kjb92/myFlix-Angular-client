import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

/**
 * The NavbarComponent provides a simple UI with a fixed position at the top
 * of the screen for the Movies view and Profile view. This is also where the user can log out.
 */
export class NavBarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * Navigates to the movies view
   */
  goToAllMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the user's profile view
   */
  goToUserProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the user by clearing the localStorage,
   * thereby deleting the "user" and "token" key/values
   */
  handleLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}