import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
//Import Angular Material components
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//Import custom components
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);;
  }

  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

  deleteFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((res: any) => {
      console.log(res);
      this.snackBar.open('Movie deleted from favorites', 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

  openGenreDetails(name: string, description: string): void {
    console.log(name);
    this.dialog.open(GenreDetailsComponent, {
      data: {
        name: name,
        description: description,
      },
    });
  }

  openDirectorDetails(name: string, bio: string, birth: string): void {
    console.log(name);
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        name: name,
        bio: bio,
        birth: birth,
      },
    });
  }

  openMovieDetails(
    description: string
  ): void {
    console.log(description);
    this.dialog.open(MovieDetailsComponent, {
      data: {
        description: description
      },
    });
  }
}
