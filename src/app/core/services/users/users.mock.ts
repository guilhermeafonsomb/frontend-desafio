import { IUser, IUserDTO } from '../../../shared/models/users.interface';

export const mockUserDTO: IUserDTO = {
  name: 'John Doe',
};

export const mockUsersReponse: IUser[] = [
  {
    id: 'idAgenda',
    name: 'title agenda',
    createdAt: '2024-03-04T01:31:09.234Z',
    updatedAt: '2024-03-04T01:31:09.234Z',
  },
];

export const mockUserReponse: IUser = {
  id: 'idAgenda',
  name: 'title agenda',
  createdAt: '2024-03-04T01:31:09.234Z',
  updatedAt: '2024-03-04T01:31:09.234Z',
};
