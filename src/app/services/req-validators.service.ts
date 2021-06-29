import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DniValidPayload } from '../interfaces/customers/DniValidPayload';
import { EmailValidPayload } from '../interfaces/user/EmailValidPayload';
import { Customer } from '../models/customer.model';
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ReqValidatorsService {
  constructor(private http: HttpClient) {}

  emailIsValid(emailValid: EmailValidPayload) {
    if (emailValid.email != null) {
      return this.http.post(base_url + 'user/checkEmailIsValid', emailValid);
    } else {
      return of(null);
    }
  }

  customerEmailIsValid(emailValid: EmailValidPayload) {
    if (emailValid.email != null) {
      return this.http.post(
        base_url + 'customer/checkEmailIsValid',
        emailValid
      );
    } else {
      return of(null);
    }
  }

  customerDniIsValid(dniValid: DniValidPayload) {
    if (dniValid.dni != null) {
      return this.http.post<Customer>(
        base_url + 'customer/checkDniIsValid',
        dniValid
      );
    } else {
      return of(null);
    }
  }
}
