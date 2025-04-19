import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryItemCardComponent } from './grocery-item-card.component';

describe('GroceryItemCardComponent', () => {
  let component: GroceryItemCardComponent;
  let fixture: ComponentFixture<GroceryItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroceryItemCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
