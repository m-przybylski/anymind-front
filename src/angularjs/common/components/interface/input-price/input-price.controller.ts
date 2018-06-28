// tslint:disable:curly
import { IInputPriceComponentBindings } from './input-price';
import { CommonSettingsService } from '../../../services/common-settings/common-settings.service';
import { keyboardCodes } from '../../../classes/keyboard';

// tslint:disable:member-ordering
export class InputPriceComponentController implements IInputPriceComponentBindings {
  public id: string;
  public name: string;
  public ngModel = 0;
  public inputText: string;
  public placeholder = '0.00';
  public isUsignPunctuationMarks = false;
  public digitsCodesBlocked: number[] = [];
  public isFocus = false;
  public isDirty = false;
  public currency: string;
  private priceRegexp: RegExp;
  public inputValueCallback: (num: number) => void;
  public onPatternValidation: (isRegExpPriceValid: boolean) => void;
  public isValid: boolean;
  public isDisabled = false;

  public static $inject = ['$element', 'CommonSettingsService'];

    constructor(private $element: ng.IRootElementService, CommonSettingsService: CommonSettingsService) {
    this.priceRegexp = CommonSettingsService.localSettings.pricePattern;
  }

  public $onInit(): void {
    const digitsCodes = [keyboardCodes.enter,
      keyboardCodes.backspace,
      keyboardCodes.zero,
      keyboardCodes.one,
      keyboardCodes.two,
      keyboardCodes.three,
      keyboardCodes.four,
      keyboardCodes.five,
      keyboardCodes.six,
      keyboardCodes.seven,
      keyboardCodes.eight,
      keyboardCodes.nine,
      keyboardCodes.comma,
      keyboardCodes.dot,
      keyboardCodes.arrowRight,
      keyboardCodes.arrowLeft,
      keyboardCodes.comma,
      keyboardCodes.commaASCI,
      keyboardCodes.dot,
      keyboardCodes.dotASCI
    ];

    this.blockInvalidDigits(digitsCodes);
  }

  public blockInvalidDigits = (digitsCodes: number[]): void => {
    this.$element.find('input').bind('keypress keydown', (event) => {
      if (this.isKeyAllowed(digitsCodes, event) && this.isCtrlKeyAllowed(event) ||
        this.digitsCodesBlocked.indexOf(event.keyCode) >= 0) {
        event.preventDefault();
      }
    });
  }

  private isCtrlKeyAllowed = (event: JQueryKeyEventObject): boolean => !(event.ctrlKey || event.metaKey);

  private isKeyAllowed = (digitsCodes: number[], event: JQueryKeyEventObject): boolean => {
    const code = event.keyCode || event.which;
    return digitsCodes.indexOf(code) === -1;
  }

  public isRegExpPriceValid = (): boolean =>
    (this.priceRegexp).test(this.ngModel.toString()) || (this.ngModel.toString().length  === 0 && this.isDirty)

  public onChange = (): void => {
    this.isUsignPunctuationMarks = this.ngModel.toString().indexOf('.') !== -1 ||
                                   this.ngModel.toString().indexOf(',') !== -1;

    if (this.isUsignPunctuationMarks) {
      this.digitsCodesBlocked = [
        keyboardCodes.dot, keyboardCodes.comma, keyboardCodes.dotASCI, keyboardCodes.commaASCI
      ];
    } else {
      this.digitsCodesBlocked = [];
    }

    if (this.inputValueCallback) {
      this.inputValueCallback(this.ngModel);
    }

    if (this.onPatternValidation)
      this.onPatternValidation(this.isRegExpPriceValid());
  }

  public onFocus = (): void => {
    this.isFocus = true;
    this.isDirty = true;
  }

  public onBlur = (): void => {
    this.isFocus = false;
  }

  public $onDestroy = (): void => {
    this.$element.find('input').unbind('keypress keydown');
  }
}
