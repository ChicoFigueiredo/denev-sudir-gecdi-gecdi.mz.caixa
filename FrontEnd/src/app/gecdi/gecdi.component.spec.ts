import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GecdiComponent } from './gecdi.component';

describe('GecdiComponent', () => {
  let component: GecdiComponent;
  let fixture: ComponentFixture<GecdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GecdiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GecdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
