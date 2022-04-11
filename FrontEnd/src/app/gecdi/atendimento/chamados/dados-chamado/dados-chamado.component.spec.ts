import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosChamadoComponent } from './dados-chamado.component';

describe('DadosChamadoComponent', () => {
  let component: DadosChamadoComponent;
  let fixture: ComponentFixture<DadosChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosChamadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
