import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeModel } from '../../model/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-editemployeemodal',
  standalone: true,
  imports: [FormsModule, NgStyle],
  templateUrl: './editemployeemodal.component.html',
  styleUrl: './editemployeemodal.component.css'
})
export class EditemployeemodalComponent {

  @Input() public employee!:EmployeeModel;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  name="";
  position="";

  constructor(
    public activeModal: NgbActiveModal
  ) { }


  passBack() {
    console.log(this.employee.date)
    if(this.name!=""){
      this.employee.name = this.name
    }
    
    if(this.position!=""){
      this.employee.position = this.position
    }
    
    // console.log("Changed - ", this.employee.name, this.employee.position)
    this.passEntry.emit(this.employee);
    this.activeModal.close(this.employee);
  }

}
