import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the API URL that will provide data for the client app
const apiURL = 'https://myflix-kjb92.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }
  
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiURL + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiURL + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the get all movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one movie endpoint
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one director endpoint
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one genre endpoint
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'genres/' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the get one user endpoint
  getOneUser(): Observable < any > {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'users/' + user.username, {
        headers: new HttpHeaders(
            {
                Authorization: 'Bearer ' + token
            }
        )
    }).pipe(
      map(this.extractResponseData), 
      catchError(this.handleError));
}

  // Making the api call for the get favourite movies for a user endpoint
  getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'users/' + user.username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  // Making the api call for the add a movie to favourite Movies endpoint
  addFavoriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    user.favoriteMovies.push(movieId);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(apiURL + 'users/' + user.username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Method for checking if favorite movie
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.favoriteMovies.indexOf(movieId) >= 0;
  }

  // Making the api call for the elete a movie from the favorite movies endpoint
  deleteFavoriteMovie(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    const index = user.favoriteMovies.indexOf(movieId);
    console.log(index);
    if (index > -1) { // only splice array when item is found
      user.favoriteMovies.splice(index, 1); // 2nd parameter means remove one item only
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.delete(apiURL + 'users/' + user.username + '/movies/' + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }),
      responseType: "text"
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the edit user endpoint
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiURL + 'users/' + user.username, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the delete user endpoint
  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiURL + 'users/' + user._id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
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
