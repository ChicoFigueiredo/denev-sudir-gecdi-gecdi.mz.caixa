import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEnvioComponent } from './dialog-envio.component';

describe('DialogEnvioComponent', () => {
  let component: DialogEnvioComponent;
  let fixture: ComponentFixture<DialogEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
