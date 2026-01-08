import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileResponse } from '../models/profile-response.model';
import { OnlineUserResponse } from '../models/online-user-response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private API_URL = 'http://localhost:8082/assign1/api/users';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<ProfileResponse> {
    const token = localStorage.getItem('accessToken');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    return this.http.get<ProfileResponse>(this.API_URL + '/me', { headers });
  }

  getOnlineUsers(): Observable<OnlineUserResponse[]> {
    const token = localStorage.getItem('accessToken');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    return this.http.get<OnlineUserResponse[]>(this.API_URL + '/online-users', { headers });
  }

  logoutUser(userId: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    return this.http.post(`${this.API_URL}/logout/${userId}`, {}, { headers });
  }

  lockUser(userId: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    return this.http.post(`${this.API_URL}/lock/${userId}`, {}, { headers });
  }
}
