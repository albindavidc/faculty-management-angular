import { Injectable } from '@angular/core';
import { Faculty } from '../../model/faculty';
import { catchError, Observable, retry, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminDataService {
  private dataUrl = 'http://localhost:3001/admin/faculty';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
      return throwError(
        () => new Error(`Client error: ${error.error.message}`)
      );
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
      return throwError(() => new Error(`Server error: ${error.status}`));
    }
  }

  addFaculty(facultyObj: Faculty): Observable<Faculty> {
    console.log('Sending request to:', this.dataUrl);
    console.log('Request payload:', facultyObj);

    return this.http
      .post<Faculty>(this.dataUrl, facultyObj, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAllFaculty(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.dataUrl);
  }
}
