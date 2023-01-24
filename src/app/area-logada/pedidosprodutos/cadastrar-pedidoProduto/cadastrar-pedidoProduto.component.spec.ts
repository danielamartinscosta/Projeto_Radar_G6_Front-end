import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPedidoProdutoComponent } from './cadastrar-pedidoProduto.component';

describe('CadastrarPedidoProdutoComponent', () => {
  let component: CadastrarPedidoProdutoComponent;
  let fixture: ComponentFixture<CadastrarPedidoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarPedidoProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPedidoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
