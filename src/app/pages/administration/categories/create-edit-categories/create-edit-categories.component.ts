import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/EntityServices/category.service';

export interface DialogData {
  id?: number;
  category?: string;
  title: string;
}
@Component({
  selector: 'app-create-edit-categories',
  templateUrl: './create-edit-categories.component.html',
  styleUrls: ['./create-edit-categories.component.scss'],
})
export class CreateEditCategoriesComponent {
  categoryForm = this.fb.group({
    category: [this.data.category, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CreateEditCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }
    const categoryValue: string = this.categoryForm.controls['category'].value;

    if (this.data.id != null) {
      const newCategory = new Category(this.data.id, categoryValue);
      this.update(newCategory);
    } else {
      const newCategory = new Category(null, categoryValue);
      this.add(newCategory);
    }
    this.dialogRef.close();
  }

  add(category: Category) {
    this.categoryService.add(category);
  }
  update(category: Category) {
    this.categoryService.update(category);
  }
}
