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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { VoteService } from '../../core/services/vote/vote.service';
import { Agenda } from '../../shared/models/agendas.interface';
import { IUser } from '../../shared/models/users.interface';
import { AddVoteDTO } from '../../shared/models/vote.interface';

@Component({
  selector: 'app-form-votation',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatRadioModule,
  ],
  templateUrl: './form-votation.component.html',
  styleUrl: './form-votation.component.scss',
})
export class FormVotationComponent {
  user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Agenda,
    private voteService: VoteService
  ) {}

  form: FormGroup = new FormGroup({
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.pattern('^[0-9]+$'),
    ]),
    votation: new FormControl(null, [Validators.required]),
  });

  getErrorMessage(field: string): string {
    if (this.form.get(field)?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (this.form.get(field)?.hasError('maxlength')) {
      return 'Máximo de caracteres excedido';
    }
    if (this.form.get(field)?.hasError('pattern')) {
      return 'Digite somente números';
    }

    return '';
  }

  onSubmit() {
    const vote = this.form.get('votation')?.value;
    const payload: AddVoteDTO = {
      agendaId: this.data.id,
      userId: this.user.id,
      vote,
    };
    this.voteService.addVote(payload).subscribe();
  }
}
