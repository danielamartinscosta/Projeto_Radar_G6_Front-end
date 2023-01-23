import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCampanhaComponent } from './detalhes-campanha.component';

describe('DetalhesCampanhaComponent', () => {
  let component: DetalhesCampanhaComponent;
  let fixture: ComponentFixture<DetalhesCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesCampanhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
