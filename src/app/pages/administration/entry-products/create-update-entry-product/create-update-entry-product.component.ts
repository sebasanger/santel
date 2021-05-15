import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EntryProduct } from 'src/app/models/entry-product.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { EntryProductService } from 'src/app/services/EntityServices/entry-product.service';
import { ProductService } from 'src/app/services/EntityServices/product.service';

export interface DialogData {
  title: string;
  id?: number;
  amount?: number;
  buyPrice?: number;
  productId?: number;
  createdAt?: Date;
  userId?: number;
}

@Component({
  selector: 'app-create-update-entry-product',
  templateUrl: './create-update-entry-product.component.html',
  styleUrls: ['./create-update-entry-product.component.scss'],
})
export class CreateUpdateEntryProductComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private entryProductService: EntryProductService,
    private productService: ProductService,
    public dialogRef: MatDialogRef<CreateUpdateEntryProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  products$: Observable<Product[]>;

  ngOnInit(): void {
    this.productService.getAll();

    this.products$ = this.productService.entities$;
  }

  productForm = this.fb.group({
    product: [this.data.productId, Validators.required],
    amount: [this.data.amount, Validators.required],
    buyPrice: [this.data.buyPrice, Validators.required],
  });

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const product = new Product(
      this.productForm.controls['product'].value,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );

    const user = new User(
      null,
      null,
      null,
      this.data.userId,
      null,
      null,
      null,
      null
    );

    if (this.data.id != null) {
      const editEntryProduct = new EntryProduct(
        this.data.id,
        product,
        user,
        this.productForm.controls['amount'].value,
        this.productForm.controls['buyPrice'].value,
        this.data.createdAt
      );
      this.update(editEntryProduct);
    } else {
      const newEntryProduct = new EntryProduct(
        null,
        product,
        null,
        this.productForm.controls['amount'].value,
        this.productForm.controls['buyPrice'].value
      );
      this.add(newEntryProduct);
    }
    this.dialogRef.close();
  }

  add(entryProduct: EntryProduct) {
    this.entryProductService.add(entryProduct);
  }
  update(entryProduct: EntryProduct) {
    this.entryProductService.update(entryProduct);
  }
}
