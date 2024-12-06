import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { EmployeeservicesService } from './service/employeeservices.service';
import { EmployeeModel } from './model/Employee';
import { AddEmpComponent } from './components/add-emp/add-emp.component';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalcomponentComponent } from './components/modalcomponent/modalcomponent.component';
import { ShowEmpComponent } from './components/show-emp/show-emp.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgbNavModule, ShowEmpComponent, RouterOutlet, AddEmpComponent, ReactiveFormsModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proj4';

  Employees: EmployeeModel[] = [];

  constructor(private EmployeeService:EmployeeservicesService, private empService: EmployeeservicesService, public modalService: NgbModal ){}

  ngOnInit():void{
      this.EmployeeService.getEmployees().subscribe((Employees:any)=>
        this.Employees=Employees);
  }

  deleteEmployee(Employee:EmployeeModel){
    this.EmployeeService.deleteEmployee(Employee).subscribe(()=>
    (this.Employees=this.Employees.filter((e)=>e.id!==Employee.id))
    );

  }

  openModal(Employee:EmployeeModel){

    console.log("Passed data to modal", Employee.name)

    const modalRef = this.modalService.open(ModalcomponentComponent);

    modalRef.componentInstance.employee = Employee;
    modalRef.result.then((result)=>{
      if(result){
        this.deleteEmployee(Employee);
      }
    })

  }



}
