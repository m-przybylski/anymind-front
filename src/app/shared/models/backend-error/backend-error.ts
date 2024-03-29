// tslint:disable:only-arrow-functions
// tslint:disable:no-any
// tslint:disable:max-classes-per-file
export function isBackendError(err: any): err is BackendError {
  return err && typeof err === 'object' && typeof err.code === 'number' && typeof err.message === 'string';
}

export function iterateOverBackendErrors(backendError: BackendError, fn: (e: number) => void): any {
  backendError.errors.forEach(err => {
    fn(err.code);
  });
}

export class BackendError {
  public readonly code: number;
  public readonly message: string;
  public readonly errors: ReadonlyArray<SingleBackendError>;

  constructor(code: number, message: string, errors: ReadonlyArray<SingleBackendError>) {
    this.code = code;
    this.message = message;
    this.errors = errors;
  }
}

export class SingleBackendError {
  public readonly code: number;
  public readonly message: string;
}

export enum BackendErrors {
  BadAuthenticationCredentials = 101,
  IncorrectRequest = 107,
  NotAllowedToLogin = 108,
  IncorrectValidation = 200,
  InvalidAddressEmail = 202,
  PasswordInvalid = 204,
  InvalidBankAccountNumber = 207,
  MsisdnInvalid = 214,
  InvalidServicePrice = 216,
  MissingPermissionForCreatingFreeConsultation = 216,
  NoSuchAccount = 300,
  CanNotFindAccount = 302,
  CannotFindMsisdnToken = 322,
  CannotFindEmailToken = 323,
  CanNotFindMsisdnVerification = 330,
  PincodeSentTooRecently = 332,
  CreateAnotherPinCodeTokenRecently = 333,
  EmailAlreadyExists = 334,
  AccountAlreadyExists = 335,
  MsisdnIsNotValid = 340,
  MsisdnVerificationTokenIncorrect = 343,
  TooManyMsisdnTokenAttempts = 344,
  ToManyIncorrectPasswordAttempts = 345,
  MsisdnBlocked = 346,
  AccountAlreadyconfirmedEmail = 353,
  onGoingCall = 405,
  unavailableExpert = 419,
  callYourself = 404,
  callPending = 401,
  recipientUnavailable = 418,
  creditCardUncharged = 471,
  promoCodeExpired = 474,
  MissingTokenModelId = 408,
  CannotGetClientComplaint = 448,
  UserIsNotExpertInSue = 455,
}
