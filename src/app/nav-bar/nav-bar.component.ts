import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  goToAllMovies(): void {
    this.router.navigate(['movies']);
  }

  goToUserProfile(): void {
    this.router.navigate(['profile']);
  }

  handleLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}