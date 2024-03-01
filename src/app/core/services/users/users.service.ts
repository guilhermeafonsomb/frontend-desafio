import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IUser, IUserDTO } from '../../../shared/models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = `${environment.api}/users`;
  constructor(private http: HttpClient) {}

  createUser(user: IUserDTO) {
    return this.http.post(this.url, user);
  }

  getAllUsers() {
    return this.http.get<IUser[]>(this.url);
  }

  getUserById(id: number) {
    return this.http.get<IUser>(`${this.url}/${id}`);
  }

  updateUser(id: number, user: IUserDTO) {
    return this.http.put(`${this.url}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
