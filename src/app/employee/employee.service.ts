import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Employee} from "./employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employee';

  constructor(protected http: HttpClient) {}

  getEmployees(): Observable<HttpResponse<Employee[]>> {
    return this.http.get<Employee[]>(this.apiUrl,{ observe: 'response' });
  }

  addEmployee(employee: Employee): Observable<HttpResponse<Employee>> {
    return this.http.post<Employee>(this.apiUrl,employee, { observe: 'response' });
  }

  updateEmployee(employee: Employee): Observable<HttpResponse<Employee>> {
    return this.http.post<Employee>(`${this.apiUrl}`, employee,{ observe: 'response' });
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
