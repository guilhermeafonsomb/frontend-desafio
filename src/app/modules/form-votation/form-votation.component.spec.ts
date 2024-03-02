import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVotationComponent } from './form-votation.component';

describe('FormVotationComponent', () => {
  let component: FormVotationComponent;
  let fixture: ComponentFixture<FormVotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVotationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormVotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
