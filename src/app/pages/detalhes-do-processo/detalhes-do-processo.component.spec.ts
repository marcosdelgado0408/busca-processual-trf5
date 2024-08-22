import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDoProcessoComponent } from './detalhes-do-processo.component';

describe('DetalhesDoProcessoComponent', () => {
  let component: DetalhesDoProcessoComponent;
  let fixture: ComponentFixture<DetalhesDoProcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalhesDoProcessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesDoProcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
