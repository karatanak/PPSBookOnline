import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabCategoryPage } from './tab-category.page';

describe('TabCategoryPage', () => {
  let component: TabCategoryPage;
  let fixture: ComponentFixture<TabCategoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TabCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
