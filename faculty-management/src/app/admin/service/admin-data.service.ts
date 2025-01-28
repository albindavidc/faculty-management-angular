import { Injectable } from '@angular/core';
import { Faculty } from '../../model/faculty';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminDataService {
  dataUrl: string = 'https://localhost:3031/admin/faculty';
  constructor(private http: HttpClient) {}

  addFaculty(facultyObj: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(this.dataUrl, facultyObj);
  }
}
