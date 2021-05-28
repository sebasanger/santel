import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.post(base_url + 'user/checkEmailIsValid', emailValid);
  }

  customerEmailIsValid(emailValid: EmailValidPayload) {
    return this.http.post(base_url + 'customer/checkEmailIsValid', emailValid);
  }

  customerDniIsValid(dniValid: DniValidPayload) {
    return this.http.post<Customer>(
      base_url + 'customer/checkDniIsValid',
      dniValid
    );
  }
}
