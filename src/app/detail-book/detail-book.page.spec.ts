import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailBookPage } from './detail-book.page';

describe('DetailBookPage', () => {
  let component: DetailBookPage;
  let fixture: ComponentFixture<DetailBookPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
