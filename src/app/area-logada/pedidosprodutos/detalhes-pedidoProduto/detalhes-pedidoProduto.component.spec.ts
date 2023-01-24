import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesPedidoProdutoComponent } from './detalhes-pedidoProduto.component';

describe('DetalhesPedidoProdutoComponent', () => {
  let component: DetalhesPedidoProdutoComponent;
  let fixture: ComponentFixture<DetalhesPedidoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesPedidoProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesPedidoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
