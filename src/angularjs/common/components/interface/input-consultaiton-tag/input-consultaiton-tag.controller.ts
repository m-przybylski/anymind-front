// tslint:disable:strict-boolean-expressions
// tslint:disable:no-shadowed-variable
// tslint:disable:no-any
// tslint:disable:curly
import { IInputConsultationTagBindings } from './input-consultaiton-tag';
import { SearchApi } from 'profitelo-api-ng/api/api';
import { PostSuggestTags, GetSuggestedTags } from 'profitelo-api-ng/model/models';
import * as angular from 'angular';
import { PromiseService } from '../../../services/promise/promise.service';
import { CommonSettingsService } from '../../../services/common-settings/common-settings.service';
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';

// tslint:disable:strict-type-predicates
// tslint:disable:member-ordering
export class InputConsultationTagComponentController implements IInputConsultationTagBindings {
  public selectedTags: string[] = [];
  public suggestedTags: string[] = [];
  public tagModel = '';
  public isValid?: boolean;
  public validationText?: string;
  public isDirty: boolean;
  public isFocus: boolean;
  public isInputValidationAlert: boolean;
  public isSubmitted: boolean;
  public areSuggestedTagsLoading: boolean;
  public serviceName: string;
  public serviceDescription: string;
  public maxTagsCount = this.CommonSettingsService.localSettings.consultationTagsMaxCount;
  public cacheSuggestedTags?: PostSuggestTags;
  public isError = false;
  public validationAlertTranslation = '';

  private static readonly suggestedTagsLimit = 7;
  private static readonly suggestedTagsLoaderDelay = 500;
  private static readonly postTagsSuggestionsDelay = 500;
  private static readonly validationTranslations = {
    charactersCount: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_CHARACTERS_COUNT',
    wordsCount: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_WORDS_COUNT',
    tagsCount: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_TAGS_COUNT',
    name: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_TAG_NAME',
    duplicate: 'INTERFACE.INPUT_CONSULTATION_TAG.VALIDATION_TEXT.INVALID_TAG_DUPLICATED'
  };
  private tagPattern = this.CommonSettingsService.localSettings.tagPattern;
  private maxTagWordsCount = this.CommonSettingsService.localSettings.consultationMaxTagWords;
  private minTagLength = this.CommonSettingsService.localSettings.consultationMinTagLength;
  private maxTagLength = this.CommonSettingsService.localSettings.consultationMaxTagLength;

  public static $inject = ['SearchApi', 'promiseService', '$log', 'CommonSettingsService'];

  constructor(private SearchApi: SearchApi,
              private promiseService: PromiseService,
              private $log: ng.ILogService,
              private CommonSettingsService: CommonSettingsService) {
  }

  public onEnter = (): void => {
    const tag = (this.tagModel || '').toLowerCase();
    if (this.isTagValid(tag)) {
      this.selectedTags.push(tag);
      this.isInputValidationAlert = false;
      this.tagModel = '';
      this.updateSuggestedTags();
    } else {
      this.showInputValidationAlert(tag);
    }
  }

  public addSelectedItem = (item: string, index: number): void => {
    if (this.selectedTags.indexOf(item) === -1 && this.isTagsCountValid()) {
      this.selectedTags.push(item);
      this.isInputValidationAlert = false;
      this.suggestedTags.splice(index, 1);
      this.updateSuggestedTags();
    }
  }

  public onBlur = (): void => {
    this.isDirty = true;
    this.isFocus = false;
    this.isInputValidationAlert = false;
  }

  public onFocus = (): void => {
    this.updateSuggestedTags();
    this.isFocus = true;
  }

  public deleteSelectedItem = (index: number): void => {
    this.selectedTags.splice(index, 1);
    this.updateSuggestedTags();
  }

  public isValidationAlertVisible = (): boolean =>
    !this.isValid && this.isDirty && !this.isFocus || this.isSubmitted && !this.isValid

  public postTagsSuggestions = (tagsQuery: PostSuggestTags): void => {
    this.isError = false;
    this.areSuggestedTagsLoading = true;
    this.promiseService.setMinimalDelay(this.SearchApi.postTagsSuggestionsRoute(tagsQuery),
      InputConsultationTagComponentController.suggestedTagsLoaderDelay)
      .then((suggestedTags) => {
        this.onPostTagsSuggestions(suggestedTags, tagsQuery);
      }).catch((err) => {
      this.onPostTagsSuggestionsError(err, tagsQuery);
    }).finally(() => {
      this.areSuggestedTagsLoading = false;
    });
  }

  public onChange = (): void => {
    this.isInputValidationAlert = false;
    this.handleTagEnd();
  }

  public onPaste = (event: Event): void => {
    event.preventDefault();
  }

  private handleTagEnd = (): void => {
    if (this.tagModel.indexOf(';') !== -1 || this.tagModel.indexOf(',') !== -1) {
      this.tagModel = this.tagModel.slice(0, -1);
      this.onEnter();
      if (!this.isInputValidationAlert) this.tagModel = '';
    }
  }

  private updateSuggestedTags = (): void => {
    const tagsQuery = {
      description: this.serviceDescription,
      query: this.serviceName || '',
      count: InputConsultationTagComponentController.suggestedTagsLimit,
      tags: this.selectedTags
    };

    if (!this.areSuggestedTagsLoading
      && this.checkIsDataForQueryTagsExist()
      && !this.cacheSuggestedTags
      || this.checkIsQueryForTagsChange(tagsQuery)) {
      this.throttlePostTagsSuggestions(tagsQuery);
    }
  }

  private checkIsQueryForTagsChange = (tagsQuery: PostSuggestTags): boolean =>
    this.cacheSuggestedTags !== undefined &&
    (tagsQuery.description !== this.cacheSuggestedTags.description
      || tagsQuery.query !== this.cacheSuggestedTags.query
      || this.cacheSuggestedTags.tags && this.cacheSuggestedTags.tags.length !== tagsQuery.tags.length)

  private checkIsDataForQueryTagsExist = (): boolean =>
    this.serviceName !== undefined || this.selectedTags && this.selectedTags.length > 0

  private onPostTagsSuggestions = (suggestedTags: GetSuggestedTags, tagsQuery: PostSuggestTags): void => {
    this.suggestedTags = suggestedTags.tags.map(tag => tag.toLowerCase());
    this.cacheSuggestedTags = angular.copy(tagsQuery);
  }

  private onPostTagsSuggestionsError = (error: any, tagsQuery: PostSuggestTags): void => {
    this.$log.error(error);
    this.cacheSuggestedTags = angular.copy(tagsQuery);
    this.isError = true;
  }

  private isTagPatternValid = (tag: string): boolean => this.tagPattern.test(tag);

  private isTagLengthValid = (tag: string): boolean =>
    this.minTagLength <= tag.length && tag.length <= this.maxTagLength

  private isMaxTagWordsValid = (tag: string): boolean => tag.split(' ').length <= this.maxTagWordsCount;

  private throttlePostTagsSuggestions = (tagsQuery: PostSuggestTags): void =>
    _.throttle(() => this.postTagsSuggestions(tagsQuery),
      InputConsultationTagComponentController.postTagsSuggestionsDelay)()

  private isTagsCountValid = (): boolean => this.selectedTags.length < this.maxTagsCount;

  private isTagNotDuplicated = (tag: string): boolean => this.selectedTags.indexOf(tag) === -1;

  private isTagValid = (tag: string): boolean =>
    this.isTagLengthValid(tag)
    && this.isTagNotDuplicated(tag)
    && this.isTagsCountValid()
    && this.isTagPatternValid(tag)
    && this.isMaxTagWordsValid(tag)

  private assignValidationAlertTranslation = (tag: string): void => {
    if (!this.isTagsCountValid()) {
      this.validationAlertTranslation = InputConsultationTagComponentController.validationTranslations.tagsCount;
    } else if (!this.isTagLengthValid(tag)) {
      this.validationAlertTranslation = InputConsultationTagComponentController.validationTranslations.charactersCount;
    } else if (!this.isTagNotDuplicated(tag)) {
      this.validationAlertTranslation = InputConsultationTagComponentController.validationTranslations.duplicate;
    } else if (!this.isMaxTagWordsValid(tag)) {
      this.validationAlertTranslation = InputConsultationTagComponentController.validationTranslations.wordsCount;
    } else if (!this.isTagPatternValid(tag)) {
      this.validationAlertTranslation = InputConsultationTagComponentController.validationTranslations.name;
    }
  }

  private showInputValidationAlert = (tag: string): void => {
    this.assignValidationAlertTranslation(tag);
    this.isInputValidationAlert = true;
  }

}
