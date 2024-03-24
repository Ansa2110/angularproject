import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupeventsComponent } from './startupevents.component';

describe('StartupeventsComponent', () => {
  let component: StartupeventsComponent;
  let fixture: ComponentFixture<StartupeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartupeventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartupeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
