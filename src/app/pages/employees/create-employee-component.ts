import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { Employee } from '../../infrastructure/types/employee';
import { EmployeeForm } from '../../infrastructure/types/employee-form';

@Component({
  selector: 'app-create-employee-component',
  imports: [ReactiveFormsModule],
  template: `
    <input type="text" placeholder="First Name" [formControl]="form.controls.email" />
  `,
  styles: ``,
})
export class CreateEmployeeComponent {

  private readonly employeeService = inject(EmployeeService);

  form = new FormGroup<EmployeeForm>({
    firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    position: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    level: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });

  submit() {
    if (this.form.valid) {
      const employee = this.form.value as Employee;
      this.employeeService.createEmployee(employee);
    }
  }  
}
