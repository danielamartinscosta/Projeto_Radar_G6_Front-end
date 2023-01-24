import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPedidoComponent } from './cadastrar-pedido.component';

describe('CadastrarPedidoComponent', () => {
  let component: CadastrarPedidoComponent;
  let fixture: ComponentFixture<CadastrarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
