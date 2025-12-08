import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { Employee } from '../../infrastructure/types/employee';

@Component({
  selector: 'app-create-employee-component',
  imports: [],
  template: `
    <p>
      create-employee-component works!
    </p>
  `,
  styles: ``,
})
export class CreateEmployeeComponent {

  private readonly employeeService = inject(EmployeeService);

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emali: new FormControl('', [Validators.required, Validators.email]),
    position: new FormControl('', Validators.required),
    level: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.valid) {
      const employee = this.form.value as Employee;
      this.employeeService.createEmployee(employee);
    }
  }  
}
