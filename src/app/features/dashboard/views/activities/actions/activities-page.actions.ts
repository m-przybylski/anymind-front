// tslint:disable:max-classes-per-file
import { Action } from '@ngrx/store';
import { GetProfileActivity } from '@anymind-ng/api';

export enum ActivitiesPageActionTypes {
  LoadMoreExpertActivities = '[Activities Page] Load More Expert Activities',
  LoadMoreCompanyActivities = '[Activities Page] Load More Company Activities',
  LoadMoreClientActivities = '[Activity Page] Load More Client Activities',
  ShowImportantActivities = '[Activities Page] Show Important Activities',
  HideImportantActivities = '[Activities Page] Hide Important Activities',
  ActivityDetailsClosed = '[Activities Page] Activity Details Closed',
  ExpertActivityRowClick = '[Activity Page] Expert Activity Row Click',
  CompanyActivityRowClick = '[Activity Page] Company Activity Row Click',
  ClientActivityRowClick = '[Activity Page] Client Activity Row Click',
  LoadFilteredCompanyActivities = '[Activity Page] Load Filtered Company Activities',
}

export class LoadMoreExpertActivitiesAction implements Action {
  public readonly type = ActivitiesPageActionTypes.LoadMoreExpertActivities;

  constructor(public payload: { currentOffset: number; offsetIterator: number }) {}
}

export class LoadMoreCompanyActivitiesAction implements Action {
  public readonly type = ActivitiesPageActionTypes.LoadMoreCompanyActivities;

  constructor(public payload: { currentOffset: number; offsetIterator: number }) {}
}

export class LoadMoreClientActivitiesAction implements Action {
  public readonly type = ActivitiesPageActionTypes.LoadMoreClientActivities;

  constructor(public payload: { currentOffset: number; offsetIterator: number }) {}
}

export class ShowImportantActivitiesAction implements Action {
  public readonly type = ActivitiesPageActionTypes.ShowImportantActivities;
}

export class HideImportantActivitiesAction implements Action {
  public readonly type = ActivitiesPageActionTypes.HideImportantActivities;
}

export class ActivityDetailsClosedAction implements Action {
  public readonly type = ActivitiesPageActionTypes.ActivityDetailsClosed;

  constructor(public payload: GetProfileActivity) {}
}

export class ExpertActivityRowClickAction implements Action {
  public readonly type = ActivitiesPageActionTypes.ExpertActivityRowClick;

  constructor(public payload: { getProfileActivity: GetProfileActivity; isImportant: boolean }) {}
}

export class CompanyActivityRowClickAction implements Action {
  public readonly type = ActivitiesPageActionTypes.CompanyActivityRowClick;

  constructor(public payload: { getProfileActivity: GetProfileActivity; isImportant: boolean }) {}
}

export class ClientActivityRowClickAction implements Action {
  public readonly type = ActivitiesPageActionTypes.ClientActivityRowClick;

  constructor(public payload: { getProfileActivity: GetProfileActivity; isImportant: boolean }) {}
}

export class LoadFilteredCompanyActivitiesAction implements Action {
  public readonly type = ActivitiesPageActionTypes.LoadFilteredCompanyActivities;

  constructor(public payload: { filter?: string }) {}
}

export type ActivitiesPageActionUnion =
  | LoadMoreExpertActivitiesAction
  | LoadMoreCompanyActivitiesAction
  | HideImportantActivitiesAction
  | ShowImportantActivitiesAction
  | ActivityDetailsClosedAction
  | ExpertActivityRowClickAction
  | CompanyActivityRowClickAction
  | LoadFilteredCompanyActivitiesAction
  | LoadMoreClientActivitiesAction
  | ClientActivityRowClickAction;
