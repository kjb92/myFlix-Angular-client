import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the API URL that will provide data for the client app
const apiURL = 'https://myflix-kjb92.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  /**
   * Creates a new user. Expects a JSON in the request body
   * @param userDetails 
   * @returns http POST request to the ... /users endpoint
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiURL + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the user login endpoint
  /**
   * POST a user login with username and password, credentials are authenticated
   * @param userDetails 
   * @returns http POST request to the ... /login endpoint
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiURL + 'login', userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the get all movies endpoint
  /**
   * GET a JSON object of ALL movies from the database
   * @returns http GET request to ... /movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the get one movie endpoint
  /**
   * GET a JSON object of a single movie by id
   * @param title 
   * @returns http GET request to ... /movies/:title
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the get one director endpoint
  /**
   * GET a JSON object of a movie-director by name
   * @param directorName 
   * @returns http GET request to ... /directors/:directorName
   */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + 'directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the get one genre endpoint
  /**
   * GET the description of a genre
   * @param genreName 
   * @returns http GET request to ... /genres/:genreName
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + 'genres/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the get one user endpoint
  /**
   * GET a JSON object of one user by username
   * @returns http GET request to ... /users/:username
   */
  getOneUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + 'users/' + user.username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the get favourite movies for a user endpoint
  /**
   * GET an array of a user's favorite movies by username
   * @returns http GET request to ... /users/:username
   */
  getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiURL + 'users/' + user.username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );
  }

  // Making the api call for the add a movie to favourite Movies endpoint
  /**
   * POST a movie to a user's list of favorite movies
   * @param movieId 
   * @returns http PUT request to ... /users/:username/movies/:id
   */
  addFavoriteMovie(id: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    user.favoriteMovies.push(id);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(token);
    return this.http
      .post(apiURL + 'users/' + user.username + '/movies/' + id, '', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //Method for checking if favorite movie
  /**
   * Checks if a movie was already added to favorite movies.
   * @param movieId The movie ID
   * @returns boolean true/false
   */
  isFavoriteMovie(id: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favoriteMovies.indexOf(id) >= 0;
  }

  // Making the api call for the elete a movie from the favorite movies endpoint
  /**
   * DELETE a movie from a user's list of favorite movies
   * @param movieId 
   * @returns http DELETE request to ... /users/:username/movies/:id
   */
  deleteFavoriteMovie(id: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    const index = user.favoriteMovies.indexOf(id);
    console.log(index);
    if (index > -1) {
      // only splice array when item is found
      user.favoriteMovies.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .delete(apiURL + 'users/' + user.username + '/movies/' + id, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the edit user endpoint
  /**
   * Updates (PUT) the information of a user by username
   * @param updatedUser 
   * @returns http PUT request to ... users/:username
   */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log(updatedUser);
    return this.http
      .put(apiURL + 'users/' + user.username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the delete user endpoint
  /**
   * DELETE an existing user from the database by user username
   * @returns http DELETE request to ... users/:username
   */
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log(user.username);
    return this.http
      .delete(apiURL + 'users/' + user.username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      responseType: "text"
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  //Error-handling method
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status Code: ${error.status},` + `Error body is: ${error.error}`
      );
    }
    const errorMessage = 'Something bad happened; please try again later.';
    return throwError(() => new Error(errorMessage));
  }
}
