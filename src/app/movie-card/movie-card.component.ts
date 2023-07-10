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

/**
 * The MovieCardComponent class fetches and displays all movies in card format
 */
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

  /**
   * Fetch all movies with FetchApiDataService.getAllMovies()
   * @returns all movies in an array of objects
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Check if a movie id is included in the user's favorites
   * @param id
   * @returns a boolean value
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);;
  }

  /**
  * Add one movie id into the user's favorites with FetchApiDataService.addFavoriteMovie()
  * @param id
  */
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

  /**
   * Remove one movie id from the user's favorites with FetchApiDataService.deleteFavoriteMovie()
   * @param id
   */
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

  /**
   * Opens the genre dialog.
   * @param name The genre's name to show on the dialog (title)
   * @param description The genre's description to show on the dialog
   */
  openGenreDetails(name: string, description: string): void {
    console.log(name);
    this.dialog.open(GenreDetailsComponent, {
      data: {
        name: name,
        description: description,
      },
    });
  }

  /**
   * Opens the director dialog.
   * @param name The director's name to show on the dialog (title)
   * @param bio The director's biography to show on the dialog
   * @param birth The director's birthday to show on the dialog
  */
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

  /**
   * Opens the movie description dialog.
   * @param description The text to show on the dialog
   */
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
