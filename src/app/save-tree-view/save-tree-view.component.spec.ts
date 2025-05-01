import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTreeViewComponent } from './save-tree-view.component';

describe('SaveTreeViewComponent', () => {
  let component: SaveTreeViewComponent;
  let fixture: ComponentFixture<SaveTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveTreeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
