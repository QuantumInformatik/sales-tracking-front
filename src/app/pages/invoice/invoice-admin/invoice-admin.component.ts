import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "primeng/api";
import {InvoiceService} from "../../../core/services/invoice.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-invoice-admin',
  templateUrl: './invoice-admin.component.html',
  styleUrls: ['./invoice-admin.component.css']
})
export class InvoiceAdminComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  @ViewChild("productInvoiceListComponent") productInvoiceListComponent: any;
  subtotal: number = 0;
  total: number = 0;

  constructor(private messageService: MessageService, private invoiceService: InvoiceService) { }

  ngOnInit(): void {
  }

  outputEmitProductInvoice() {
    this.subtotal = this.productInvoiceListComponent.subtotal;
    this.total = this.productInvoiceListComponent.total;
  }

  saveInvoice() {
    let productsInvoice = this.productInvoiceListComponent.buildProductsInvoice()
    if(!productsInvoice.customer){
      this.messageService.add({severity: 'warn', summary: 'Select the customer', detail: ''});
      return
    }
    if(productsInvoice.products.length <=0){
      this.messageService.add({severity: 'warn', summary: 'Select products', detail: ''});
      return
    }
    let today = new Date()
    let products = []
    productsInvoice.products.forEach(p=>{
      let product = {
        productId: p.id,
        quantity: p.quantity,
        sellPrice: p.sellPrice,
        timestamp: today
      }
      products.push(product)
    })

    let invoice = {
      customerId: productsInvoice.customer.id,
      employeeId: 1,
      invoiceProductsWrapperDtoList: products,
      localDateTimeInvoice: today,
      subtotal: productsInvoice.subtotal,
      tax: 0,
      total: productsInvoice.total
    }

    this.sub.add(this.invoiceService.saveInvoice(invoice).subscribe(data => {
      this.messageService.add({severity: 'success', summary: 'Success', detail: ''});
    }, error => {

      console.error('Error: ' + error);
      this.messageService.add({severity: 'error',summary: 'Error', detail: ''});
    },() => {

    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
