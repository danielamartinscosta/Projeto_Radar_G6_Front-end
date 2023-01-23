import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarLojaComponent } from './cadastrar-loja.component';

describe('CadastrarLojaComponent', () => {
  let component: CadastrarLojaComponent;
  let fixture: ComponentFixture<CadastrarLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarLojaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
