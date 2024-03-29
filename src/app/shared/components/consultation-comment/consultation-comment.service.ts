import { Injectable } from '@angular/core';
import { ServiceUsageEventService, GetReport } from '@anymind-ng/api';
import { Observable } from 'rxjs';

@Injectable()
export class ConsultationCommentService {
  constructor(private serviceUsageEventService: ServiceUsageEventService) {}

  public postCommentAnswer = (sueId: string, commentId: string, content: string): Observable<void> =>
    this.serviceUsageEventService.postCommentAnswerRoute(sueId, commentId, { content });

  public postCommentReport = (sueId: string, commentId: string, cause: GetReport.CauseEnum): Observable<void> =>
    this.serviceUsageEventService.postCommentReportRoute(sueId, commentId, { cause });
}
