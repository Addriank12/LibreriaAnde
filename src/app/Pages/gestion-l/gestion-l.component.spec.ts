import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionLComponent } from './gestion-l.component';

describe('GestionLComponent', () => {
  let component: GestionLComponent;
  let fixture: ComponentFixture<GestionLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionLComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
