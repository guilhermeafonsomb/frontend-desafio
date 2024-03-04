import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { MockComponents } from 'ng-mocks';
import { AppComponent } from './app.component';
import { FormCategoriesComponent } from './modules/form-categories/form-categories.component';
import { FormSessionComponent } from './modules/form-session/form-session.component';
import { SessionsComponent } from './modules/sessions/sessions.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TabComponent } from './shared/components/tab/tab.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponents(HeaderComponent, SessionsComponent),
      ],
      imports: [
        AppComponent,
        RouterOutlet,
        HeaderComponent,
        TabComponent,
        SessionsComponent,
        FormSessionComponent,
        FormCategoriesComponent,
        CommonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call openDialog with "Crie uma pauta"', () => {
    jest.spyOn(component, 'openDialog');
    const buttonElement = fixture.debugElement.query(
      By.css("[data-test = 'btn-pauta']")
    );

    buttonElement.nativeElement.click();

    expect(component.openDialog).toHaveBeenCalled();

    expect(buttonElement).toBeTruthy();
  });

  it('should call openDialog with "Crie uma categoria"', () => {
    jest.spyOn(component, 'openDialog');
    const buttonElement = fixture.debugElement.query(
      By.css("[data-test = 'btn-categoria']")
    );

    buttonElement.nativeElement.click();

    expect(component.openDialog).toHaveBeenCalled();

    expect(buttonElement).toBeTruthy();
  });
});
