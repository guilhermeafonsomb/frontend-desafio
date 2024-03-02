import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { UsersService } from '../../../core/services/users/users.service';
import { IUser } from '../../models/users.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, AsyncPipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private usersService: UsersService) {}

  users$ = this.usersService.getAllUsers();

  handleUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
