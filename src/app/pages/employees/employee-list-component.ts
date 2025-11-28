import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee-service';

@Component({
  selector: 'app-employee-list',
  imports: [AsyncPipe, NgComponentOutlet],
  template: `
    <h2>Employee List</h2>
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (employee of employees$ | async; track employee.id) {
          <tr>
            <td>{{ employee.firstName }} {{ employee.lastName }}</td>
            <td>{{ employee.position }}</td>
            <td>
              <button (click)="showConfirmationDialog()">Delete</button>
            </td>
          </tr>
        } @empty {
          <tr>
            <td colspan="3">No hay empleados disponibles.</td>
          </tr>
        }
      </tbody>
    </table>
    <ng-container *ngComponentOutlet="confirmDialog"></ng-container>      
  `,  
})
export class EmployeeListComponent {

  private readonly employeeService = inject(EmployeeService);
  
  employees$ = this.employeeService.getEmployees();
  isConfirmationOpen = false;
  confirmDialog: any = null;

  async showConfirmationDialog() {
    this.confirmDialog = await import(
      '../../shared/components/confirmation-dialog-component'
    ).then((m) => m.ConfirmationDialogComponent);
    this.isConfirmationOpen = true;
  }
}
