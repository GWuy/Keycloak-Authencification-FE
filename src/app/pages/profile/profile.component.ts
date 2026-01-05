import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
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
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    // try to decode JWT payload to check role includes USER
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload?.roles || payload?.authorities || payload?.role || [];
      const hasUser = Array.isArray(roles) ? roles.includes('USER') : String(roles).includes('USER');
      if (!hasUser) {
        this.router.navigate(['/login']);
        return;
      }
    } catch (e) {
      // ignore decode errors and attempt to fetch profile; backend will reject if unauthorized
    }

    this.userService.getProfile().subscribe({
      next: (res) => (this.profile = res),
      error: (err) => (this.error = err.error?.message || 'Không thể tải thông tin người dùng')
    });
  }
}
