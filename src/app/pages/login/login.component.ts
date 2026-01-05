import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: res => {
        this.authService.saveToken(res);
        console.log('login response', res);
        // accept several token field names returned by various backends
        const token = (res as any).accessToken || (res as any).access_token || (res as any).token;
        console.log('access token used:', token);
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log('token payload', payload);
            let roles: any[] = [];
            if (Array.isArray(payload?.realm_access?.roles)) roles = payload.realm_access.roles;
            else if (payload?.resource_access) {
              Object.values(payload.resource_access).forEach((r: any) => { if (r?.roles) roles = roles.concat(r.roles); });
            } else if (Array.isArray(payload?.roles)) roles = payload.roles;
            else if (Array.isArray(payload?.authorities)) roles = payload.authorities;
            else if (payload?.role) roles = Array.isArray(payload.role) ? payload.role : [payload.role];

            const normalized = roles.map((r: any) => String(r).toLowerCase());
            const hasUser = normalized.some((r: any) => r.includes('user')) || normalized.some((r: any) => r.includes('role_user'));
            if (hasUser) {
              this.router.navigate(['/profile']);
              return;
            }
          } catch (e) {
            console.log('token decode error', e);
          }
        } else {
          console.log('no token found in login response');
        }

        this.router.navigate(['/']);
      },
      error: () => this.error = 'Sai username hoặc password'
    });
  }
}
