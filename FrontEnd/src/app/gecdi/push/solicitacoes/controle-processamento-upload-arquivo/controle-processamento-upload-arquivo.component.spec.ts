import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleProcessamentoUploadArquivoComponent } from './controle-processamento-upload-arquivo.component';

describe('ControleProcessamentoUploadArquivoComponent', () => {
  let component: ControleProcessamentoUploadArquivoComponent;
  let fixture: ComponentFixture<ControleProcessamentoUploadArquivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleProcessamentoUploadArquivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleProcessamentoUploadArquivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
