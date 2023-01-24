import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPedidosComponent } from './listar-pedidos.component';

describe('ListarPedidosComponent', () => {
  let component: ListarPedidosComponent;
  let fixture: ComponentFixture<ListarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
