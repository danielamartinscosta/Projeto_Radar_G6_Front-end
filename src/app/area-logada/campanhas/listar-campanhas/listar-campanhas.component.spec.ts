import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarCampanhasComponent } from './listar-campanhas.component';



describe('ListarCampanhaComponent', () => {
  let component: ListarCampanhasComponent;
  let fixture: ComponentFixture<ListarCampanhasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCampanhasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCampanhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
