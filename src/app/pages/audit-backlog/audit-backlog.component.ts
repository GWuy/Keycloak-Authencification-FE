import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditService } from '../../services/audit.service';
import { AuditResponse } from '../../models/audit-response.model';
import { FilterAuditRequest } from '../../models/filter-audit-request.model';

@Component({
  selector: 'app-audit-backlog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit-backlog.component.html',
  styleUrls: ['./audit-backlog.component.css']
})
export class AuditBacklogComponent implements OnInit {
  audits: AuditResponse[] = [];
  filter: FilterAuditRequest = {
    fromDate: '',
    toDate: ''
  };
  error = '';

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    this.loadAudits();
  }

  loadAudits(): void {
    const filterRequest: FilterAuditRequest = {};
    if (this.filter.fromDate) {
        filterRequest.fromDate = this.filter.fromDate + 'T00:00:00';
    }
    if (this.filter.toDate) {
        filterRequest.toDate = this.filter.toDate + 'T23:59:59';
    }

    this.auditService.getAuditBacklog(filterRequest).subscribe({
      next: (res) => {
        this.audits = res;
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.message || 'Không thể tải danh sách audit backlog';
      }
    });
  }

  onFilter(): void {
    this.loadAudits();
  }
}
