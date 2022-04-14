import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheEnvioComponent } from './detalhe-envio.component';

describe('DetalheEnvioComponent', () => {
  let component: DetalheEnvioComponent;
  let fixture: ComponentFixture<DetalheEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheEnvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalheEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
