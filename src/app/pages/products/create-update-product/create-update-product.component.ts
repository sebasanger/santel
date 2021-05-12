import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand.model';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { BrandService } from 'src/app/services/EntityServices/brand.service';
import { CategoryService } from 'src/app/services/EntityServices/category.service';
import { ProductService } from 'src/app/services/EntityServices/product.service';

export interface DialogData {
  title: string;
  id?: number;
  name?: string;
  stock?: number;
  price?: string;
  category?: Category;
  brand?: Brand;
}

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss'],
})
export class CreateUpdateProductComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    public dialogRef: MatDialogRef<CreateUpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  categories$: Observable<Category[]>;
  public selectedCategory: Category;

  brands$: Observable<Brand[]>;
  public selectedBrand: Brand;

  ngOnInit(): void {
    this.categoryService.getAll();
    this.categories$ = this.categoryService.entities$;

    this.brandService.getAll();
    this.brands$ = this.brandService.entities$;
  }

  productForm = this.fb.group({
    name: [this.data.name, Validators.required],
    stock: [this.data.stock, Validators.required],
    price: [this.data.price, Validators.required],
    brand: [this.data.brand.id, Validators.required],
    category: [this.data.category.id, Validators.required],
  });

  onSubmit() {
    // if (this.productForm.invalid) {
    //   return;
    // }
    // const methodValue: string = this.productForm.controls['method'].value;
    // const descriptionValue: string =
    //   this.productForm.controls['description'].value;
    // const amountOfPaymentsValue: number =
    //   this.productForm.controls['amountOfPayments'].value;
    // if (this.data.id != null) {
    //   const newProduct = new Product(
    //     this.data.id,
    //     methodValue,
    //     descriptionValue,
    //     amountOfPaymentsValue
    //   );
    //   this.update(newProduct);
    // } else {
    //   const newProduct = new Product(
    //     null,
    //     methodValue,
    //     descriptionValue,
    //     amountOfPaymentsValue
    //   );
    //   this.add(newProduct);
    // }
    // this.dialogRef.close();
  }

  add(product: Product) {
    this.productService.add(product);
  }
  update(product: Product) {
    this.productService.update(product);
  }
}
