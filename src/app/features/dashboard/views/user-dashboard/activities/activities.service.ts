import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetImportantActivitiesCounters } from '@anymind-ng/api';
import { getNotUndefinedSession } from '@platform/core/utils/store-session-not-undefined';
import { map } from 'rxjs/operators';
import * as fromCore from '@platform/core/reducers';

@Injectable()
export class ActivitiesService {
  constructor(private coreStore: Store<fromCore.IState>, private store: Store<fromCore.IState>) {}

  public get getCounters$(): Observable<GetImportantActivitiesCounters> {
    return this.store.pipe(select(fromCore.getCounters));
  }

  public isExpert(): Observable<boolean> {
    return getNotUndefinedSession(this.coreStore).pipe(map(session => session.session.expertProfileId !== undefined));
  }

  public isCompany(): Observable<boolean> {
    return getNotUndefinedSession(this.coreStore).pipe(
      map(session => session.session.organizationProfileId !== undefined),
    );
  }
}
