import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/EntityServices/brand.service';

export interface DialogData {
  id?: number;
  brand?: string;
}

@Component({
  selector: 'app-create-update-brands',
  templateUrl: './create-update-brands.component.html',
  styleUrls: ['./create-update-brands.component.scss'],
})
export class CreateUpdateBrandsComponent implements OnInit {
  brandForm = this.fb.group({
    brand: [this.data.brand, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    public dialogRef: MatDialogRef<CreateUpdateBrandsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.brandForm.invalid) {
      return;
    }
    const brandValue: string = this.brandForm.controls['brand'].value;

    if (this.data.id != null) {
      const newBrand = new Brand(this.data.id, brandValue);
      this.update(newBrand);
    } else {
      const newBrand = new Brand(null, brandValue);
      this.add(newBrand);
    }
    this.dialogRef.close();
  }

  add(brand: Brand) {
    this.brandService.add(brand);
  }
  update(brand: Brand) {
    this.brandService.update(brand);
  }
}
