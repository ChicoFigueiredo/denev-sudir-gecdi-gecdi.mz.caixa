import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSolicitacaoComponent } from './dialog-solicitacao.component';

describe('DialogSolicitacaoComponent', () => {
  let component: DialogSolicitacaoComponent;
  let fixture: ComponentFixture<DialogSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSolicitacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
