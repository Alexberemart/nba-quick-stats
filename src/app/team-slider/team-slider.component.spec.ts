import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSliderComponent } from './team-slider.component';

describe('TeamSliderComponent', () => {
  let component: TeamSliderComponent;
  let fixture: ComponentFixture<TeamSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
