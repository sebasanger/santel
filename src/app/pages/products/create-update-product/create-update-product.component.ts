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
  id?: number;
  name?: string;
  stock?: number;
  price?: number;
  code?: string;
  categoryId?: number;
  brandId?: number;
}

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss'],
})
export class CreateUpdateProductComponent implements OnInit {
  public productId: number;
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
    this.productId = this.data.id;
    this.categoryService.getAll();
    this.brandService.getAll();

    this.categories$ = this.categoryService.entities$;
    this.brands$ = this.brandService.entities$;
  }

  productForm = this.fb.group({
    name: [this.data.name, Validators.required],
    stock: [this.data.stock, Validators.required],
    price: [this.data.price, Validators.required],
    code: [this.data.code, Validators.required],
    brand: [this.data.brandId, Validators.required],
    category: [this.data.categoryId, Validators.required],
  });

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const category = new Category(
      this.productForm.controls['category'].value,
      null
    );

    const brand = new Brand(this.productForm.controls['brand'].value, null);

    if (this.data.id != null) {
      const editProduct = new Product(
        this.data.id,
        this.productForm.controls['code'].value,
        this.productForm.controls['name'].value,
        this.productForm.controls['price'].value,
        this.productForm.controls['stock'].value,
        brand,
        category
      );
      this.update(editProduct);
    } else {
      const newProduct = new Product(
        null,
        this.productForm.controls['code'].value,
        this.productForm.controls['name'].value,
        this.productForm.controls['price'].value,
        this.productForm.controls['stock'].value,
        brand,
        category
      );
      this.add(newProduct);
    }
    this.dialogRef.close();
  }

  add(product: Product) {
    this.productService.add(product);
  }
  update(product: Product) {
    this.productService.update(product);
  }
}
