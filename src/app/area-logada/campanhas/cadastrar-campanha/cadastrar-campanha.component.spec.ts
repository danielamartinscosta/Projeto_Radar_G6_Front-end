import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCampanhaComponent } from './cadastrar-campanha.component';

describe('Component', () => {
  let component: CadastrarCampanhaComponent;
  let fixture: ComponentFixture<CadastrarCampanhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarCampanhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
