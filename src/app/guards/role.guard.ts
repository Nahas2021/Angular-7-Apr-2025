import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data['roles'] as string[];
    if (this.auth.isLoggedIn() && this.auth.hasAnyRole(roles)) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
