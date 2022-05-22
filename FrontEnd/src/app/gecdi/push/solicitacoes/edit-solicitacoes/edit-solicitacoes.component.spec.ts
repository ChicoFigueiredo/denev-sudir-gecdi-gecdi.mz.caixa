import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSolicitacoesComponent } from './edit-solicitacoes.component';

describe('EditSolicitacoesComponent', () => {
  let component: EditSolicitacoesComponent;
  let fixture: ComponentFixture<EditSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSolicitacoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
