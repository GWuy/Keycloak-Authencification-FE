import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ProfileResponse } from '../../models/profile-response.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: ProfileResponse | null = null;
  error = '';
  isAdmin = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const roles = localStorage.getItem('roles');
    this.isAdmin = roles === 'ADMIN';

    this.userService.getProfile().subscribe({
      next: (res) => (this.profile = res),
      error: (err) => (this.error = err.error?.message || 'Không thể tải thông tin người dùng')
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        // Even if the backend logout fails, we should probably clear local state and redirect
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }
}
