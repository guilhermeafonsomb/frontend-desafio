import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { FormCategoriesComponent } from './modules/form-categories/form-categories.component';
import { FormSessionComponent } from './modules/form-session/form-session.component';
import { SessionsComponent } from './modules/sessions/sessions.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TabComponent } from './shared/components/tab/tab.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    TabComponent,
    SessionsComponent,
    FormSessionComponent,
    FormCategoriesComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(dialogOpen: string) {
    if (dialogOpen === 'createAgenda') {
      this.dialog.open(FormSessionComponent, {
        width: '600px',
        data: { title: 'Cadastrar uma pauta' },
      });
    } else {
      this.dialog.open(FormCategoriesComponent, {
        width: '600px',
        data: { title: 'Cadastrar uma categoria' },
      });
    }
  }
}
