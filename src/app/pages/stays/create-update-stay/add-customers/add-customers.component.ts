import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DniValidPayload } from 'src/app/interfaces/customers/DniValidPayload';
import { EmailValidPayload } from 'src/app/interfaces/user/form-user.payload';
import { Customer } from 'src/app/models/customer.model';
import { Invoice } from 'src/app/models/inovice.model';
import { CustomerService } from 'src/app/services/EntityServices/customer.service';
import { InvoiceService } from 'src/app/services/EntityServices/invoice.service';
import { ReqValidatorsService } from 'src/app/services/req-validators.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss'],
})
export class AddCustomersComponent implements OnInit, OnDestroy {
  public customerId: number;
  public customer: Customer;
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public invoices$: Observable<Invoice[]>;
  private emailValidPayload: EmailValidPayload;
  private dniValidPayload: DniValidPayload;
  public title: string = 'Customer';
  constructor(
    private fb: FormBuilder,
    private reqValidators: ReqValidatorsService,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.invoiceService.getAll();
    this.invoices$ = this.invoiceService.entities$;
    this.route.params.subscribe((params) => {
      this.customerId = params['id'];
      takeUntil(this.ngUnsubscribe);
      if (this.customerId > 0) {
        this.customerService.getByKey(this.customerId).subscribe((res) => {
          this.customer = res;
          this.customerForm.controls['name'].setValue(res.name);
          this.customerForm.controls['surname'].setValue(res.surname);
          this.customerForm.controls['dni'].setValue(res.dni);
          this.customerForm.controls['email'].setValue(res.email);
          this.customerForm.controls['birthday'].setValue(res.birthday);
          this.customerForm.controls['cuil'].setValue(res.cuil);
          this.customerForm.controls['cuit'].setValue(res.cuit);
          this.customerForm.controls['phone'].setValue(res.phone);
          this.customerForm.controls['celphone'].setValue(res.celphone);
          if (res.invoiceType) {
            this.customerForm.controls['invoice'].setValue(res.invoiceType.id);
          }
        });
      }
    });
  }

  customerForm = this.fb.group({
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
      this.customerService.update(customer);
    } else {
      this.customerService.add(customer);
    }
    this.router.navigateByUrl('pages/customers');
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
