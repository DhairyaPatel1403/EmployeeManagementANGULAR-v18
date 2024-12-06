import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeModel } from '../../model/Employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-modalcomponent',
  standalone: true,
  imports: [FormsModule, NgStyle],
  templateUrl: './modalcomponent.component.html',
  styleUrl: './modalcomponent.component.css'
})
export class ModalcomponentComponent {

  @Input() public employee!:EmployeeModel;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log(this.employee);
  }

  passBack() {
    this.passEntry.emit(this.employee);
    this.activeModal.close(this.employee);
  }


}
