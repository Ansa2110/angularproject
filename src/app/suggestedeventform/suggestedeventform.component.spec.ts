import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedeventformComponent } from './suggestedeventform.component';

describe('SuggestedeventformComponent', () => {
  let component: SuggestedeventformComponent;
  let fixture: ComponentFixture<SuggestedeventformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestedeventformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestedeventformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
