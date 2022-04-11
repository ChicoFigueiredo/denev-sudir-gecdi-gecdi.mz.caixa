import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChamadoComponent } from './dialog-chamado.component';

describe('DialogChamadoComponent', () => {
  let component: DialogChamadoComponent;
  let fixture: ComponentFixture<DialogChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogChamadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
