import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login-component/login-component';
import { EmployeeService } from './services/employee-service';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', loadComponent: () => {
        return import('./pages/registration-component/registration-component').then(
            (m) => m.RegistrationComponent
        );
    } },
    { path: 'employees', 
      providers: [EmployeeService],  
      canActivate: [authGuard],
      loadChildren: () => {
        return import('./pages/employees/employees.routes').then(
            (m) => m.routes,
        );
      }
    },
];
