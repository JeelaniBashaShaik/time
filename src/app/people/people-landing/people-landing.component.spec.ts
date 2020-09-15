import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleLandingComponent } from './people-landing.component';

describe('PeopleLandingComponent', () => {
  let component: PeopleLandingComponent;
  let fixture: ComponentFixture<PeopleLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
