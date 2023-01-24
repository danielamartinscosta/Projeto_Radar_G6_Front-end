import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPedidosProdutosComponent } from './listar-pedidosProdutos.component';

describe('ListarPedidosProdutosComponent', () => {
  let component: ListarPedidosProdutosComponent;
  let fixture: ComponentFixture<ListarPedidosProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPedidosProdutosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPedidosProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
