import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosEnvioComponent } from './dados-envio.component';

describe('DadosEnvioComponent', () => {
  let component: DadosEnvioComponent;
  let fixture: ComponentFixture<DadosEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
