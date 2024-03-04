import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { of } from 'rxjs';
import { mockUsersReponse } from '../../../core/services/users/users.mock';
import { UsersService } from '../../../core/services/users/users.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatButtonModule, MatMenuModule, MatIconModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAllUsers: () => of(mockUsersReponse),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('users$ should be defined', () => {
    expect(component.users$).toBeDefined();
  });
});
