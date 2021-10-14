import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInvoiceListComponent } from './product-invoice-list.component';

describe('ProductInvoiceListComponent', () => {
  let component: ProductInvoiceListComponent;
  let fixture: ComponentFixture<ProductInvoiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInvoiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
