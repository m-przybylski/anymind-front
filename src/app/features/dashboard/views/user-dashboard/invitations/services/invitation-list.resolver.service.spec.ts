import { InvitationService, ProfileService } from '@anymind-ng/api';
// tslint:disable-next-line:no-implicit-dependencies
import { Deceiver } from 'deceiver-core';
import { of } from 'rxjs';
import { InvitationListResolverService } from './invitation-list.resolver.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { fakeAsync, tick } from '@angular/core/testing';
import * as Mocks from './invitation-list.resolver.service.mocks';

describe('InvitationListResolverService', () => {
  const getProfileId = (profileId: string): any => of(Mocks.profileMap.get(profileId));
  let invitationService: InvitationService;
  let profileService: ProfileService;
  let invitationListResolverService: InvitationListResolverService;
  const activatedRouteSnapshot: ActivatedRouteSnapshot = Deceiver(ActivatedRouteSnapshot);
  const routerStateSnapshot: RouterStateSnapshot = Deceiver(RouterStateSnapshot);
  beforeEach(() => {
    invitationService = Deceiver(InvitationService, {
      getInvitationsRoute: jasmine.createSpy('').and.returnValue(of(Mocks.invitationsMock)),
    });

    profileService = Deceiver(ProfileService, {
      getProfileRoute: jasmine.createSpy('').and.callFake(getProfileId),
    });

    invitationListResolverService = new InvitationListResolverService(invitationService, profileService);
  });

  it('should be created', () => {
    expect(invitationListResolverService).toBeTruthy();
  });

  it('should call intivations', fakeAsync(() => {
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe();
    tick();
    expect(invitationService.getInvitationsRoute).toHaveBeenCalledTimes(1);
    expect(profileService.getProfileRoute).toHaveBeenCalledTimes(1);
  }));

  it('should return expected result', fakeAsync(() => {
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data).toEqual(Mocks.result);
    });
  }));

  it('should call profile only once', fakeAsync(() => {
    const two = 2;
    (invitationService.getInvitationsRoute as jasmine.Spy).and.returnValue(of(Mocks.invitationsMock2));
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe();
    tick();
    expect(profileService.getProfileRoute).toHaveBeenCalledTimes(two);
  }));

  it('should not throw if not organization details returned', fakeAsync(() => {
    (invitationService.getInvitationsRoute as jasmine.Spy).and.returnValue(of(Mocks.invitationsMock3));
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data).toEqual(Mocks.result3);
    });
    // this this tick will drain all times and makes sure that resolve does not throw
    tick();
  }));

  it('should sort array by date descending', fakeAsync(() => {
    (invitationService.getInvitationsRoute as jasmine.Spy).and.returnValue(of(Mocks.invitationsMock4));
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data).toEqual(Mocks.result4);
    });
  }));

  it('should filter invitations and take only new', fakeAsync(() => {
    const two = 2;
    (invitationService.getInvitationsRoute as jasmine.Spy).and.returnValue(of(Mocks.invitationsMock5));
    invitationListResolverService.resolve(activatedRouteSnapshot, routerStateSnapshot).subscribe(data => {
      expect(data.length).toEqual(two);
    });
  }));
});