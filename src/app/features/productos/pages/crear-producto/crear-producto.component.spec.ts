import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCasoIndividualComponent } from './crear-caso-individual.component';

describe('CrearCasoIndividualComponent', () => {
  let component: CrearCasoIndividualComponent;
  let fixture: ComponentFixture<CrearCasoIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCasoIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCasoIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
