import { ComponentFixture, TestBed } from '@angular/core/testing';

import { cadastrarPedidoComponent } from './cadastrar-pedido.component';

describe('pedidoComponent', () => {
  let component: cadastrarPedidoComponent;
  let fixture: ComponentFixture<cadastrarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ cadastrarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(cadastrarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
