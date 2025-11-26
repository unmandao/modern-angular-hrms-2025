import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../infrastructure/types/employee';

@Component({
  selector: 'app-employee-details',
  imports: [],
  template: `
    <h2>Employee Details</h2>
    <div>
      <label>First Name: </label>{{ employee.firstName }}
      <label>Last Name: </label>{{ employee.lastName }}
      <label>Position: </label>{{ employee.position }}
    </div>
  `,
  styles: ``,
})
export class EmployeeDetailsComponent {
   employee = inject(ActivatedRoute).snapshot.data['employee'] as Employee;
}
