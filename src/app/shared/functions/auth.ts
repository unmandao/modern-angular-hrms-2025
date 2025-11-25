import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Observable } from 'rxjs';

export function isAuth(): Observable<boolean> {
    const authService = inject(AuthService);
    return authService.isAuth$.asObservable();
}