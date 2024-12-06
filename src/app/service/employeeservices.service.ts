import { Injectable } from '@angular/core';
import { EmployeeModel } from '../model/Employee';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}



@Injectable({
  providedIn: 'root'
})
export class EmployeeservicesService {

  private apiUrl="http://localhost:5000/employees";

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<EmployeeModel[]>{
    return this.http.get<EmployeeModel[]>(this.apiUrl);
  }

  addEmployee(employeeForm:FormGroup): Observable<EmployeeModel> {
    
    const employee = new EmployeeModel();
      employee.name =employeeForm.value.name,
      employee.position = employeeForm.value.position,
      employee.salary = employeeForm.value.salary,
      employee.date = employeeForm.value.date
    
    return this.http.post<EmployeeModel>(this.apiUrl, employee, httpOptions);
  }

  deleteEmployee(employee:EmployeeModel): Observable<EmployeeModel>{
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.delete<EmployeeModel>(url);
  }

  updateEmployee(employee:EmployeeModel):Observable<EmployeeModel>{
    const url = `${this.apiUrl}/${employee.id}`;
    return this.http.put<EmployeeModel>(url, employee, httpOptions);
  }


}
