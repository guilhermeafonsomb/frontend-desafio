import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CategoriesService } from '../../core/services/categories/categories.service';
import {
  Category,
  CategoryDTO,
} from '../../shared/models/categories.interface';

@Component({
  selector: 'app-form-categories',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './form-categories.component.html',
})
export class FormCategoriesComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; data?: Category },
    private categoriesService: CategoriesService
  ) {
    if (this.data.data) {
      this.form.get('title')?.setValue(this.data.data.title);
    }
  }

  form: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(5),
    ]),
  });

  getErrorMessage(field: string): string {
    if (this.form.get(field)?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.form.get(field)?.hasError('maxlength')) {
      return 'Máximo de caracteres excedido';
    }

    if (this.form.get(field)?.hasError('minlength')) {
      return 'Mínimo de caracteres não atingido';
    }

    return '';
  }

  onSubmit() {
    const payload: CategoryDTO = {
      title: this.form.get('title')?.value,
    };

    if (this.data.data) {
      this.categoriesService
        .updateCategory(this.data.data.id, payload)
        .subscribe();
      return;
    }
    this.categoriesService.createCategory(payload).subscribe();
  }
}
