import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from 'src/app/models/category.model copy';
import { BrandService } from 'src/app/services/EntityServices/brand.service';
import Swal from 'sweetalert2';

export interface DialogData {
  id?: number;
  brand?: string;
  title: string;
}

@Component({
  selector: 'app-create-update-brands',
  templateUrl: './create-update-brands.component.html',
  styleUrls: ['./create-update-brands.component.scss'],
})
export class CreateUpdateBrandsComponent {
  brandForm = this.fb.group({
    brand: [this.data.brand, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    public dialogRef: MatDialogRef<CreateUpdateBrandsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onSubmit() {
    if (this.brandForm.invalid) {
      return;
    }
    const brandValue: string = this.brandForm.controls['brand'].value;

    if (this.data.id != null) {
      const newBrand = new Brand(this.data.id, brandValue);
      this.update(newBrand);
      Swal.fire('Updated', 'Brand now is ' + brandValue, 'success');
    } else {
      const newBrand = new Brand(null, brandValue);
      this.add(newBrand);
      Swal.fire('Added', 'Brand ' + brandValue + ' added', 'success');
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
