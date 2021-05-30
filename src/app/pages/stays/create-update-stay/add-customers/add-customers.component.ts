import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DniValidPayload } from 'src/app/interfaces/customers/DniValidPayload';
import { EmailValidPayload } from 'src/app/interfaces/user/form-user.payload';
import { Customer } from 'src/app/models/customer.model';
import { Invoice } from 'src/app/models/inovice.model';
import { InvoiceService } from 'src/app/services/EntityServices/invoice.service';
import { ReqValidatorsService } from 'src/app/services/req-validators.service';
import { addSelectCustomer } from 'src/app/store/stay/stay.actions';
@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss'],
})
export class AddCustomersComponent implements OnInit, OnDestroy {
  public customerId: number;
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public invoices$: Observable<Invoice[]>;
  private emailValidPayload: EmailValidPayload;
  private dniValidPayload: DniValidPayload;
  @ViewChild('formDirective') private formDirective: NgForm;
  constructor(
    private stayStore: Store<{ stay: any }>,
    private fb: FormBuilder,
    private reqValidators: ReqValidatorsService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.invoiceService.getAll();
    this.invoices$ = this.invoiceService.entities$;
  }

  chargeCustomer(customer: Customer) {
    this.customerId = customer.id | 0;
    this.customerForm.controls['name'].setValue(customer.name);
    this.customerForm.controls['surname'].setValue(customer.surname);
    this.customerForm.controls['dni'].setValue(customer.dni);
    this.customerForm.controls['email'].setValue(customer.email);
    this.customerForm.controls['birthday'].setValue(customer.birthday);
    this.customerForm.controls['cuil'].setValue(customer.cuil);
    this.customerForm.controls['cuit'].setValue(customer.cuit);
    this.customerForm.controls['phone'].setValue(customer.phone);
    this.customerForm.controls['celphone'].setValue(customer.celphone);
    if (customer.invoiceType) {
      this.customerForm.controls['invoice'].setValue(customer.invoiceType.id);
    }
  }

  customerForm: FormGroup = this.fb.group({
    name: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    surname: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    dni: [
      null,
      {
        validators: [Validators.required, Validators.minLength(6)],
        asyncValidators: [this.checkDniIsTaked()],
        updateOn: 'blur',
      },
    ],
    email: [
      null,
      {
        validators: [Validators.email],
        asyncValidators: [this.checkEmailIsTaked()],
        updateOn: 'blur',
      },
    ],
    birthday: [null],
    cuil: [null],
    cuit: [null],
    phone: [null],
    celphone: [null],
    invoice: [null],
  });

  onSubmit() {
    if (this.customerForm.invalid) {
      return;
    }
    const {
      name,
      surname,
      dni,
      email,
      cuil,
      cuit,
      phone,
      celphone,
      birthday,
      invoice,
    } = this.customerForm.controls;
    let newInvoice: Invoice;
    if (invoice.value != null) {
      newInvoice = new Invoice(invoice.value, null);
    }
    const customer: Customer = new Customer(
      null,
      name.value,
      surname.value,
      dni.value,
      birthday.value,
      email.value,
      phone.value,
      celphone.value,
      cuil.value,
      cuit.value,
      newInvoice
    );
    if (this.customerId != null) {
      customer.id = this.customerId;
    }
    this.stayStore.dispatch(addSelectCustomer({ customer }));
    this.cleanCustomer();
  }

  cleanCustomer() {
    this.customerId = null;
    this.customerForm.controls['name'].setValue(null);
    this.customerForm.controls['surname'].setValue(null);
    this.customerForm.controls['dni'].setValue(null);
    this.customerForm.controls['email'].setValue(null);
    this.customerForm.controls['birthday'].setValue(null);
    this.customerForm.controls['cuil'].setValue(null);
    this.customerForm.controls['cuit'].setValue(null);
    this.customerForm.controls['phone'].setValue(null);
    this.customerForm.controls['celphone'].setValue(null);
    this.customerForm.controls['invoice'].setValue(null);

    this.formDirective.resetForm();
  }

  checkEmailIsTaked(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.emailValidPayload = {
        id: this.customerId | 0,
        email: control.value,
      };
      return this.reqValidators
        .customerEmailIsValid(this.emailValidPayload)
        .pipe(
          takeUntil(this.ngUnsubscribe),
          map((res) => {
            return res ? { emailTaked: true } : null;
          })
        );
    };
  }

  checkDniIsTaked(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      this.dniValidPayload = {
        id: this.customerId | 0,
        dni: control.value,
      };
      return this.reqValidators.customerDniIsValid(this.dniValidPayload).pipe(
        takeUntil(this.ngUnsubscribe),
        map((res) => {
          if (res != null) {
            this.chargeCustomer(res);
          }
          return res ? { dniTaked: true } : null;
        })
      );
    };
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
