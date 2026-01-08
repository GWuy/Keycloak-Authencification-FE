import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuditBacklogComponent } from './pages/audit-backlog/audit-backlog.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'audit-backlog', component: AuditBacklogComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
