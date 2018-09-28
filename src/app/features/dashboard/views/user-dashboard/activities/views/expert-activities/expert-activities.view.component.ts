import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpertActivitiesViewService } from './expert-activities.view.service';
import { GetProfileActivities, GetProfileActivity, MoneyDto } from '@anymind-ng/api';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Rx';
import { pluck } from 'rxjs/internal/operators';
import { IActivitiesResolverData } from '@platform/features/dashboard/views/user-dashboard/activities/views/expert-activities/expert-activities.resolver.service';
import { Animations } from '@anymind-ng/core';

interface IProfileActivitiesWithStatus {
  activity: GetProfileActivity;
  isImportant: boolean;
}

@Component({
  selector: 'plat-expert-activities',
  templateUrl: './expert-activities.view.component.html',
  styleUrls: ['./expert-activities.view.component.sass'],
  providers: [ExpertActivitiesViewService],
  animations: Animations.addItemAnimation,
})
export class ExpertActivitiesViewComponent implements OnInit, OnDestroy {
  public readonly importantActivitiesOffset = 3;
  public isActivities = true;
  public balance: MoneyDto;
  public importantActivities: ReadonlyArray<GetProfileActivity>;
  public profileActivities: ReadonlyArray<IProfileActivitiesWithStatus>;
  public displayedImportantActivities: ReadonlyArray<GetProfileActivity>;
  public importantActivitiesCounter: number;
  public currentImportantActivitiesOffset = 3;
  public isMoreActivity: boolean;
  public importantLinkTranslationKey: string;

  private readonly activitiesOffsetIterator = 10;
  private readonly ngDestroyed$ = new Subject<void>();
  private readonly translationKeyForShowLink = 'EXPERT_ACTIVITIES.IMPORTANT_LIST_SHOW_ALL';
  private readonly translationKeyForHideLink = 'EXPERT_ACTIVITIES.IMPORTANT_LIST_HIDE';

  private currentActivitiesOffset = 0;
  private isImportantListToggle = false;

  constructor(private route: ActivatedRoute, private expertActivitiesViewService: ExpertActivitiesViewService) {}

  public ngOnInit(): void {
    this.importantLinkTranslationKey = this.translationKeyForShowLink;
    this.expertActivitiesViewService
      .getProfilePayment()
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(profileBalance => {
        this.balance = profileBalance.balance;
      });

    this.route.data
      .pipe(
        takeUntil(this.ngDestroyed$),
        pluck('activities'),
      )
      .subscribe(({ importantActivitiesList, activitiesList }: IActivitiesResolverData) => {
        this.importantActivities = [...importantActivitiesList.activities];
        this.importantActivitiesCounter = this.importantActivities.length;
        if (this.importantActivitiesCounter < this.importantActivitiesOffset) {
          this.currentImportantActivitiesOffset = this.importantActivitiesCounter;
          this.displayedImportantActivities = this.importantActivities;
        } else {
          this.currentImportantActivitiesOffset = this.importantActivitiesOffset;
          this.displayedImportantActivities = this.importantActivities.slice(0, this.importantActivitiesOffset);
        }
        this.profileActivities = this.mapToProfileActivitiesWithStatus(activitiesList);
        this.isActivities = this.profileActivities.length > 0;
        this.isMoreActivity = activitiesList.count > this.profileActivities.length;
      });
  }

  public ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  public loadMore = (): void => {
    this.currentActivitiesOffset += this.activitiesOffsetIterator;
    this.expertActivitiesViewService.getActivitiesList(String(this.currentActivitiesOffset)).subscribe(
      profileActivities => {
        this.profileActivities = [
          ...this.profileActivities,
          ...this.mapToProfileActivitiesWithStatus(profileActivities),
        ];
      },
      _error => {
        this.currentActivitiesOffset -= this.activitiesOffsetIterator;
      },
    );
  };

  public toggleImportantActivities = (): void => {
    if (this.isImportantListToggle) {
      this.currentImportantActivitiesOffset = this.importantActivitiesOffset;
      this.displayedImportantActivities = this.importantActivities.slice(0, this.importantActivitiesOffset);
      this.importantLinkTranslationKey = this.translationKeyForShowLink;
    } else {
      this.importantLinkTranslationKey = this.translationKeyForHideLink;
      this.currentImportantActivitiesOffset = this.importantActivitiesCounter;
      this.displayedImportantActivities = [...this.importantActivities];
    }
    this.isImportantListToggle = !this.isImportantListToggle;
  };

  private mapToProfileActivitiesWithStatus = (
    profileActivities: GetProfileActivities,
  ): ReadonlyArray<IProfileActivitiesWithStatus> =>
    profileActivities.activities.map((activity: GetProfileActivity) => ({
      activity,
      isImportant: this.importantActivities.some(importantActivity => importantActivity.id === activity.id),
    }));
}