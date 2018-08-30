import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmploymentWithService } from '@anymind-ng/api';

@Component({
  selector: 'plat-expert-dashboard-consultations',
  templateUrl: './expert-dashboard-consultation.component.html',
  styleUrls: ['./expert-dashboard-consultation.component.sass'],
})
export class ExpertDashboardConsultationsComponent {
  @Input()
  public consultations: ReadonlyArray<EmploymentWithService>;
  @Input()
  public isOwnProfile: boolean;

  @Output()
  public addConsultation = new EventEmitter<void>();

  public add(): void {
    this.addConsultation.emit();
  }
}