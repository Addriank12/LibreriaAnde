import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionUComponent } from './gestion-u.component';

describe('GestionUComponent', () => {
  let component: GestionUComponent;
  let fixture: ComponentFixture<GestionUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionUComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
