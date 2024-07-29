import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRComponent } from './gestion-r.component';

describe('GestionRComponent', () => {
  let component: GestionRComponent;
  let fixture: ComponentFixture<GestionRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
