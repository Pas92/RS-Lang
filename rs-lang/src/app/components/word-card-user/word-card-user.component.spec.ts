import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCardUserComponent } from './word-card-user.component';

describe('WordCardUserComponent', () => {
  let component: WordCardUserComponent;
  let fixture: ComponentFixture<WordCardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordCardUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
