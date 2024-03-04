import { Agenda, AgendaDTO } from '../../../shared/models/agendas.interface';
import { mockCategoriesResponse } from '../categories/categories.mock';

export const mockAgendaDTO: AgendaDTO = {
  title: 'string',
  duration: 1,
  category: mockCategoriesResponse,
};

export const mockAgendasReponse: Agenda[] = [
  {
    id: 'idAgenda',
    title: 'title agenda',
    duration: 60000,
    approved: false,
    active: false,
    category: mockCategoriesResponse,
    open: true,
    yesVotes: 1,
    noVotes: 0,
    startTime: '2024-03-04T01:31:09.234Z',
  },
  {
    id: 'idAgenda',
    title: 'title agenda',
    duration: 60000,
    approved: false,
    active: false,
    category: mockCategoriesResponse,
    open: true,
    yesVotes: 0,
    noVotes: 0,
    startTime: '2024-03-04T01:31:09.234Z',
  },
];

export const mockAgendaReponse: Agenda = {
  id: 'idAgenda',
  title: 'title agenda',
  duration: 60000,
  approved: false,
  active: false,
  category: mockCategoriesResponse,
  open: null,
  yesVotes: 0,
  noVotes: 1,
  startTime: '2024-03-04T01:31:09.234Z',
};
