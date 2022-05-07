import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoCurvasComponent } from './manutencao-curvas.component';

describe('ManutencaoCurvasComponent', () => {
  let component: ManutencaoCurvasComponent;
  let fixture: ComponentFixture<ManutencaoCurvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManutencaoCurvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoCurvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
