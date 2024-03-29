// tslint:disable:no-empty
import { TestBed, inject } from '@angular/core/testing';
import { LoggerFactory } from '@anymind-ng/core';
import { ConsultationTagsComponentService, TagValidationStatus } from './consultation-tags.component.service';
import { SearchService } from '@anymind-ng/api';
import { provideMockFactoryLogger } from 'testing/testing';
import { Deceiver } from 'deceiver-core';

describe('ConsultationTagsComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConsultationTagsComponentService,
        provideMockFactoryLogger(),
        {
          provide: SearchService,
          useValue: Deceiver(SearchService, { postTagsSuggestionsRoute: jest.fn() }),
        },
      ],
    });

    TestBed.get(LoggerFactory).createLoggerService.mockReturnValue({
      warn: (): void => {},
      error: (): void => {},
    });
  });

  it('should be created', inject([ConsultationTagsComponentService], (service: ConsultationTagsComponentService) => {
    expect(service).toBeTruthy();
  }));

  it('should get suggested tags', () => {
    const service = TestBed.get(ConsultationTagsComponentService);
    const searchService = TestBed.get(SearchService);
    const query = {
      query: 'query',
      tags: ['tag'],
    };
    service.getSuggestedTags(query);
    expect(searchService.postTagsSuggestionsRoute).toHaveBeenCalledWith(query);
  });

  it('should get duplicated tag status', () => {
    const service = TestBed.get(ConsultationTagsComponentService);
    service.getTagValidationStatus('tag', ['tag', 'tag2', 'tag3']);

    expect(service.getTagValidationStatus('tag', ['tag', 'tag2', 'tag3'])).toBe(TagValidationStatus.DUPLICATED);
  });

  it('should get valid tag status', () => {
    const service = TestBed.get(ConsultationTagsComponentService);
    service.getTagValidationStatus('tag', ['tag', 'tag2', 'tag3']);

    expect(service.getTagValidationStatus('tag4', ['tag', 'tag2', 'tag3'])).toBe(TagValidationStatus.VALID);
  });

  it('should check min count tags', () => {
    const service = TestBed.get(ConsultationTagsComponentService);
    expect(service.isTagsMinCountInvalid(['tag'])).toBeTruthy();
  });
});
