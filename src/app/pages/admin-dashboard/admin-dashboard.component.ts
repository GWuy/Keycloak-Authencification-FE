import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { OnlineUserResponse } from '../../models/online-user-response.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: OnlineUserResponse[] = [];
  loading = true;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getOnlineUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Không thể tải danh sách người dùng';
        this.loading = false;
        console.error(err);
      }
    });
  }

  logoutUser(userId: string): void {
    if (confirm('Bạn có chắc chắn muốn logout người dùng này?')) {
      this.userService.logoutUser(userId).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          alert('Logout thất bại: ' + (err.error?.message || 'Lỗi không xác định'));
        }
      });
    }
  }

  lockUser(userId: string): void {
    if (confirm('Bạn có chắc chắn muốn khóa người dùng này?')) {
      this.userService.lockUser(userId).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (err) => {
          alert('Khóa người dùng thất bại: ' + (err.error?.message || 'Lỗi không xác định'));
        }
      });
    }
  }
}
