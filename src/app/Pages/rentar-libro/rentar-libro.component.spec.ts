import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentarLibroComponent } from './rentar-libro.component';

describe('RentarLibroComponent', () => {
  let component: RentarLibroComponent;
  let fixture: ComponentFixture<RentarLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentarLibroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
