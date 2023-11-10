import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabCartPage } from './tab-cart.page';

describe('TabCartPage', () => {
  let component: TabCartPage;
  let fixture: ComponentFixture<TabCartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
