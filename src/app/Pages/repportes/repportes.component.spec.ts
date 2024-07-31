import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepportesComponent } from './repportes.component';

describe('RepportesComponent', () => {
  let component: RepportesComponent;
  let fixture: ComponentFixture<RepportesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepportesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
