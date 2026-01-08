import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8082/assign1/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { username, password });
  }

  register(registerData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, registerData);
  }

  saveToken(res: AuthResponse) {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('expiresIn', res.expiresIn);
    localStorage.setItem('roles', res.roles);
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh`, {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });
  }

  logout() {
    const accessToken = localStorage.getItem('accessToken');

    return this.http.post(`${this.API_URL}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
