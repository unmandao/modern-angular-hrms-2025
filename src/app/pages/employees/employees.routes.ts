import { Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee-component';
import { EditEmployeeComponent } from './edit-employee-component';
import { EmployeeDetailsComponent } from './employee-details-component';
import { EmployeeListComponent } from './employee-list-component';
import { employeeDetailsResolver } from '../../shared/resolvers/employee-details.resolver';

export const routes: Routes = [
    { path: 'list', component: EmployeeListComponent },
    { 
        path: 'details/:id', 
        component: EmployeeDetailsComponent,
        resolve: {
            employee: employeeDetailsResolver
        }
    },
    { path: 'create', component: CreateEmployeeComponent },
    { path: 'edit', component: EditEmployeeComponent },
 ];