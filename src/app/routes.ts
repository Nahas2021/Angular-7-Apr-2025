import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GroceryListComponent } from './pages/grocery-list/grocery-list.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { PermissionTreeComponent } from './permission-tree/permission-tree.component';
import { PermissionsPageComponent } from './permissions-page/permissions-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default redirect
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact/:name', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'grocery-list', component: GroceryListComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {path: 'permission-page', component: PermissionsPageComponent, canActivate: [AuthGuard]},
  {path: 'permission-tree', component: PermissionTreeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
  {
    path: 'shipping-slip/:id',
    loadComponent: () =>
      import('./pages/shipping-slip/shipping-slip.component').then(m => m.ShippingSlipComponent)
  },
  { path: '**', redirectTo: 'login' } // Wildcard LAST
];


export default routes;
