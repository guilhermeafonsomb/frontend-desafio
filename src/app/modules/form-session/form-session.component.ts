import { CommonModule } from '@angular/common';
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
import { MatSelectModule } from '@angular/material/select';
import { AgendasService } from '../../core/services/agendas/agendas.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Agenda, AgendaDTO } from '../../shared/models/agendas.interface';
import { Category } from '../../shared/models/categories.interface';
@Component({
  selector: 'app-form-session',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
  ],
  templateUrl: './form-session.component.html',
})
export class FormSessionComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    category: new FormControl('', [Validators.required]),
    duration: new FormControl('', [
      Validators.required,
      Validators.max(3),
      Validators.min(1),
    ]),
  });

  categories: Category[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; data?: Agenda },
    private agendasService: AgendasService,
    private categoriesService: CategoriesService
  ) {
    if (this.data.data) {
      this.form.get('title')?.setValue(this.data.data.title);
      this.form.get('category')?.setValue(this.data.data.category);
      this.form
        .get('duration')
        ?.setValue(this.data.data.duration / 60000, { emitEvent: false });
    }
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  compareFn(c1: Category, c2: Category): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  getErrorMessage(field: string): string {
    if (this.form.get(field)?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.form.get(field)?.hasError('maxlength')) {
      return 'Máximo de caracteres excedido';
    }

    if (this.form.get(field)?.hasError('max')) {
      return 'Duração máxima excedida';
    }

    return '';
  }

  onSubmit() {
    const durationMillisegonds = this.form.get('duration')?.value * 60000;

    const payload: AgendaDTO = {
      duration: durationMillisegonds,
      title: this.form.get('title')?.value,
      category: this.form.get('category')?.value,
    };

    if (this.data.data) {
      this.agendasService.updateAgenda(this.data.data.id, payload).subscribe();
      return;
    }

    this.agendasService.createAgenda(payload).subscribe();
  }
}
