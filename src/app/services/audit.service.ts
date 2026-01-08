import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditResponse } from '../models/audit-response.model';
import { FilterAuditRequest } from '../models/filter-audit-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private API_URL = 'http://localhost:8082/assign1/api/audit';

  constructor(private http: HttpClient) {}

  getAuditBacklog(filter: FilterAuditRequest): Observable<AuditResponse[]> {
    const token = localStorage.getItem('accessToken');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
    return this.http.post<AuditResponse[]>(`${this.API_URL}/search`, filter, { headers });
  }
}
