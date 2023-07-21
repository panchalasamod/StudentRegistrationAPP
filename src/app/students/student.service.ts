import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, finalize, map } from "rxjs/operators";

import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {



  private baseURLStudents = "https://localhost:44355/api/StudentMaster";

  constructor(private httpClient: HttpClient) { }

  getStudentsList() {
    return this.httpClient.get<Student>(`${this.baseURLStudents}/GetAll`).pipe(
      map(response => response)
    );
  }

  createStudent(student: Student): Observable<Object> {
    debugger
    return this.httpClient.post(`${this.baseURLStudents}`, student);
  }

  getStudentById(id: any): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseURLStudents}/${id}`);
  }

  searchStudents(keyWord: string) {
    return this.httpClient.get<Student>(`${this.baseURLStudents}/SearchStudent/` + keyWord).pipe(
      map(response => response)
    );
  }

  updateStudent(student: Student): Observable<Object> {
    console.log(student)
    return this.httpClient.put(`${this.baseURLStudents}`, student);
  }

  deleteStudent(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURLStudents}/${id}`);
  }

  getDepartments() {
    // return this.httpClient.get<Department>(`${this.baseURLDepartment}`);
  }

}
