import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormSubmittedEvent, NgForm } from "@angular/forms";
import { EmployeeservicesService } from '../../service/employeeservices.service';
import { EmployeeModel } from '../../model/Employee';
import { NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {Location} from '@angular/common'; 
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgStyle, RouterLink, RouterLinkActive, CommonModule, NgbToastModule],
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.css'
})
export class AddEmpComponent {

  constructor(private empService: EmployeeservicesService, private location:Location){

  }

  Employees: EmployeeModel[] = [];


  employeeForm=new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    salary:new FormControl(0, [Validators.min(1000), Validators.max(9999999999999)]),
    position: new FormControl("", [Validators.required]),
    date: new FormControl("", [Validators.required])
  })

  



  goToPage():void{
    this.location.replaceState('/show-employees');
    window.location.reload();
  }

  showToastForEmptySubmit=false




  onSubmit(){
    console.log("Added Employee" + this.employeeForm.value.name)

    if(this.employeeForm.value.name!="" && this.employeeForm.value.position!="" && this.employeeForm.value.salary!=0 && this.employeeForm.value.date!=""){
      this.empService.addEmployee(this.employeeForm).subscribe((emp:EmployeeModel) => this.Employees.push(emp))


      setTimeout( ()=>{this.goToPage() }, 1000); 
    }
    else{

      this.showToastForEmptySubmit=true

    }

  



  }



}
