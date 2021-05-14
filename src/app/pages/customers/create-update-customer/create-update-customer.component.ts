import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Invoice } from 'src/app/models/inovice.model';
import { CustomerService } from 'src/app/services/EntityServices/customer.service';
import { InvoiceService } from 'src/app/services/EntityServices/invoice.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-update-customer',
  templateUrl: './create-update-customer.component.html',
  styleUrls: ['./create-update-customer.component.scss'],
})
export class CreateUpdateCustomerComponent implements OnInit {
  private customerId: number;
  public customer: Customer;
  public invoices$: Observable<Invoice[]>;
  constructor(
    private fb: FormBuilder,
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
          this.customerForm.controls['invoice'].setValue(res.invoiceType.id);
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
    dni: [null, [Validators.required]],
    email: [
      null,
      {
        validators: [Validators.email],
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
}
