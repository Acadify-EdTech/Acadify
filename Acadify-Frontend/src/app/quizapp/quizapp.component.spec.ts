import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizappComponent } from './quizapp.component';

describe('QuizappComponent', () => {
  let component: QuizappComponent;
  let fixture: ComponentFixture<QuizappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuizappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
