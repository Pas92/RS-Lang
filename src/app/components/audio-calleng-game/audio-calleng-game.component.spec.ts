import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioCallengGameComponent } from './audio-calleng-game.component';

describe('AudioCallengGameComponent', () => {
  let component: AudioCallengGameComponent;
  let fixture: ComponentFixture<AudioCallengGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioCallengGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioCallengGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
