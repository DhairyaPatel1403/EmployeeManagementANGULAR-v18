import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EmployeeModel } from '../../model/Employee';
import { EmployeeservicesService } from '../../service/employeeservices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditemployeemodalComponent } from '../editemployeemodal/editemployeemodal.component';


@Component({
  selector: 'app-edit-emp',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './edit-emp.component.html',
  styleUrl: './edit-emp.component.css'
})
export class EditEmpComponent {

  @Input() password!:string;
  @Input() changedPosition!:string;
  showInputToChange=false;

  nameToShow!:string;

  
  Employees: EmployeeModel[] = [];

  constructor(private EmployeeService:EmployeeservicesService, private empService: EmployeeservicesService, public modalService: NgbModal ){}

  ngOnInit():void{
      this.EmployeeService.getEmployees().subscribe((Employees:any)=>
        this.Employees=Employees);
  }

  increementSalary(employee:EmployeeModel){
    employee.salary = employee.salary+(employee.salary*0.1)
    this.empService.updateEmployee(employee).subscribe();
  }
  decreementSalary(employee:EmployeeModel){
    employee.salary = employee.salary-(employee.salary*0.1)
    this.empService.updateEmployee(employee).subscribe();
  }

  changePosition(employee:EmployeeModel){
    employee.position = this.changedPosition;
    this.empService.updateEmployee(employee).subscribe();
  }

  changeDialogAppears(employee:EmployeeModel){
    console.log(employee)
    this.showInputToChange=true
    this.nameToShow=employee.name
  }

  changeEmployeeModal(Employee:EmployeeModel){

    console.log("Passed data to modal", Employee.name)

    const modalRef = this.modalService.open(EditemployeemodalComponent);

    modalRef.componentInstance.employee = Employee;
    modalRef.result.then((result)=>{
      if(result){
        this.empService.updateEmployee(Employee).subscribe();
      }
    })

  }



}
