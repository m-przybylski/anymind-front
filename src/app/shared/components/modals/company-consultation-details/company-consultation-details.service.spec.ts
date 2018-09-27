import { EmploymentService, InvitationService, ProfileService, ServiceService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { LoggerService } from '@anymind-ng/core';
import { TestBed } from '@angular/core/testing';
import { CompanyConsultationDetailsViewService } from '@platform/shared/components/modals/company-consultation-details/company-consultation-details.service';
import { provideMockFactoryLogger } from '../../../../../testing/testing';
import { cold } from 'jasmine-marbles';

describe('CompanyConsultationDetailsViewService', () => {
  const loggerService: LoggerService = Deceiver(LoggerService, {
    debug: jasmine.createSpy(''),
    warn: jasmine.createSpy(''),
    error: jasmine.createSpy(''),
  });

  let service: CompanyConsultationDetailsViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompanyConsultationDetailsViewService,
        {
          provide: ServiceService,
          useValue: Deceiver(ServiceService),
        },
        {
          provide: EmploymentService,
          useValue: Deceiver(EmploymentService),
        },
        {
          provide: InvitationService,
          useValue: Deceiver(InvitationService),
        },
        {
          provide: ProfileService,
          useValue: Deceiver(ProfileService),
        },
        provideMockFactoryLogger(loggerService),
      ],
    });

    (loggerService.error as jasmine.Spy).calls.reset();
    (loggerService.warn as jasmine.Spy).calls.reset();
    (loggerService.debug as jasmine.Spy).calls.reset();
  });

  beforeEach(() => {
    service = TestBed.get(CompanyConsultationDetailsViewService);
  });

  fit('should get consultation details', () => {
    const profileService = TestBed.get(ProfileService);
    const serviceService = TestBed.get(ServiceService);

    const getServiceTags = {
      serviceId: '1234',
      tags: [{ name: 'tag' }, { name: 'tag2' }],
    };

    const getService = {
      id: '1234',
      ownerId: 'ownerId',
      name: 'Name',
      description: 'Description',
      price: {
        amount: 1,
        currency: 'PLN',
      },
      language: 'pl',
      isSuspended: false,
      isFreelance: false,
      createdAt: new Date(),
      deletedAt: new Date(),
    };

    const moneyDto = {
      amount: 1,
      currency: 'PLN',
    };

    const getProfile = {
      id: '1234',
      isActive: false,
    };

    const expertProfile = {
      id: '1234',
      name: 'name',
      avatar: 'avatar',
      description: 'description',
    };

    const employmentWithExpertProfile = {
      id: '1234',
      serviceId: '1234',
      employeeProfile: expertProfile,
      usageCounter: 1,
      commentCounter: 1,
      ratingCounter: 1,
      createdAt: Date,
    };

    const getServiceWithEmployees = {
      serviceDetails: {
        id: '1234',
        ownerProfile: getProfile,
        name: 'Name',
        description: 'Description',
        netPrice: moneyDto,
        grossPrice: moneyDto,
        language: 'pl',
        isSuspended: false,
        isFreelance: false,
        createdAt: new Date(),
      },
      employeesDetails: [employmentWithExpertProfile],
    };

    const getProfileWithDocuments = {};

    const result = {
      tagsList: ['tag', 'tag2'],
      serviceDetails: {
        consultationDetails: getService,
        profileDetails: getProfileWithDocuments,
      },
      employeesList: [
        {
          usageCounter: employmentWithExpertProfile.usageCounter,
          commentCounter: employmentWithExpertProfile.commentCounter,
          ratingCounter: undefined,
          id: employmentWithExpertProfile.id,
          name: employmentWithExpertProfile.employeeProfile.name,
          avatar: employmentWithExpertProfile.employeeProfile.avatar,
          employeeId: employmentWithExpertProfile.employeeProfile.id,
        },
      ],
    };

    const expected = cold('--(a|)', { a: result });

    const postServicesTagsRoute = cold('-(a|)', { a: [getServiceTags] });
    const getServiceRoute = cold('-(a|)', { a: getService });
    const getProfileRoute = cold('-(a|)', { a: getProfileWithDocuments });
    const postServiceWithEmployeesRoute = cold('-(a|)', { a: [getServiceWithEmployees] });

    serviceService.postServicesTagsRoute = jasmine
      .createSpy('postServicesTagsRoute')
      .and.returnValue(postServicesTagsRoute);
    serviceService.getServiceRoute = jasmine.createSpy('getServiceRoute').and.returnValue(getServiceRoute);
    profileService.getProfileRoute = jasmine.createSpy('getProfileRoute').and.returnValue(getProfileRoute);
    serviceService.postServiceWithEmployeesRoute = jasmine
      .createSpy('postServiceWithEmployeesRoute')
      .and.returnValue(postServiceWithEmployeesRoute);

    expect(service.getConsultationDetails('1234')).toBeObservable(expected);
  });
});
