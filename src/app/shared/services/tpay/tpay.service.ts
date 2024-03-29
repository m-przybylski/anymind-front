import { Injectable } from '@angular/core';
import { EnvironmentService, Environment } from '@platform/core/services/environment/environment.service';
import { Config } from 'src/config';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JSEncrypt } from 'jsencrypt';

@Injectable({ providedIn: 'root' })
export class TPayService {
  private jsencrypt: JSEncrypt;

  constructor() {
    this.setTPayPublicKey();
  }

  public encryptCardData(cardNumber: string, expireDate: string, codeCVC: string): Observable<string> {
    return of(this.createStringToEncryptCard(cardNumber, expireDate, codeCVC)).pipe(
      map(stringRoEncrypt => this.jsencrypt.encrypt(stringRoEncrypt)),
    );
  }

  private setTPayPublicKey(): void {
    const environment = EnvironmentService.get();
    this.jsencrypt = new JSEncrypt({});

    switch (environment) {
      case Environment.PRODUCTION:
        this.jsencrypt.setPublicKey(Config.paymentCardPublicKeys.productionKey);
        break;

      default:
        this.jsencrypt.setPublicKey(Config.paymentCardPublicKeys.stageKey);
    }
  }

  private createStringToEncryptCard(cardNumber: string, expireDate: string, codeCVC: string): string {
    return `${cardNumber}|${expireDate}|${codeCVC}|https://${window.location.host}`;
  }
}
