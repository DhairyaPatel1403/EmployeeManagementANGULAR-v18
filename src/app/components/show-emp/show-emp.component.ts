import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalcomponentComponent } from '../modalcomponent/modalcomponent.component';
import { RouterModule } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EmployeeModel } from '../../model/Employee';
import { EmployeeservicesService } from '../../service/employeeservices.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-emp',
  standalone: true,
  imports: [FormsModule, RouterOutlet, AddEmpComponent, ReactiveFormsModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './show-emp.component.html',
  styleUrl: './show-emp.component.css'
})
export class ShowEmpComponent {

  Employees: EmployeeModel[] = [];

  constructor(private EmployeeService:EmployeeservicesService, private empService: EmployeeservicesService, public modalService: NgbModal ){}

  ngOnInit():void{
      this.EmployeeService.getEmployees().subscribe((Employees)=>
        this.Employees=Employees);

      
  }

  deleteEmployee(Employee:EmployeeModel){
    this.EmployeeService.deleteEmployee(Employee).subscribe(()=>
    (this.Employees=this.Employees.filter((e)=>e.id!==Employee.id))
    );

  }

  searchText!:string;

  search(){
    this.Employees = this.Employees.filter((element)=>{
      return element.name.toLowerCase()==this.searchText.toLowerCase();
    });
  }

  openModal(Employee:EmployeeModel){

    console.log("Passed data to modal", Employee.name)

    const modalRef = this.modalService.open(ModalcomponentComponent);

    modalRef.componentInstance.employee = Employee;  //this is to access the instance changed in the child s
    modalRef.result.then((result)=>{
      if(result){
        this.deleteEmployee(Employee);
      }
    })

  }


}
