import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../../core/services/product.service";
import {Subscription} from "rxjs";
import {ProductInvoice} from "../../../core/model/product-invoice.dto";

@Component({
  selector: 'app-product-invoice-list',
  templateUrl: './product-invoice-list.component.html',
  styleUrls: ['./product-invoice-list.component.css']
})
export class ProductInvoiceListComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  public cols: any[] | undefined;
  public colsSelected: any[] | undefined;
  productsInvoice: Array<ProductInvoice> = [];
  productsInvoiceSelected: Array<ProductInvoice> = [];
  productsInvoiceSelectedT: Array<ProductInvoice> = [];
  totalRecords = 0;
  public sortField = 'id';
  public sortOrder = 1;
  loading = false;
  loadingS = false;
  productName: any;
  productFind = new ProductInvoice();

  products: Array<any> = [];
  subtotal: number = 0;
  total: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'Code', width: '100px',sort: true, align: 'left' },
      { field: 'name', header: 'Name', width: '100px',sort: true, align: 'left' },
      { field: 'sellPrice', header: 'Sell price', width: '100px',sort: true, align: 'left' },
      { field: 'quantity', header: 'Quantity', width: '100px',sort: true, align: 'left' },
      { field: 'total', header: 'Total', width: '100px',sort: true, align: 'left' },
      { field: 'stock', header: 'Stock', width: '100px',sort: true, align: 'left' },
      { field: 'actions', header: 'Add', width: '100px', align: 'left' },
    ];
    this.colsSelected = [
      { field: 'code', header: 'Code', width: '100px',sort: true, align: 'left' },
      { field: 'name', header: 'Name', width: '100px',sort: true, align: 'left' },
      { field: 'sellPrice', header: 'Sell price', width: '100px',sort: true, align: 'left' },
      { field: 'quantity', header: 'Quantity', width: '100px',sort: true, align: 'left' },
      { field: 'total', header: 'Total', width: '100px',sort: true, align: 'left' },
      { field: 'actions', header: 'Add', width: '100px', align: 'left' },
    ];
    this.getProductsByName()
  }

  getProductsByName(name?: any): void {
    this.loading = true;
    this.sub.add(this.productService.getProducts(name).subscribe(data => {
      if(data.body){
        this.productsInvoice = data.body
        if(this.productsInvoiceSelected.length >0){

          for(let i = 0; i < this.productsInvoice.length; i++){
            let productFound = this.productsInvoiceSelected.find(p=>p.id==this.productsInvoice[i].id)
            if(productFound){
              this.productsInvoice[i]=productFound
            }
          }
        }
        this.products = data.body;
        this.totalRecords = data.length;
      }
    }, error => {
      this.loading = false;
      console.error('Error: ' + error);
    }, () => {
      this.loading = false;
    }));
  }

  public getTotal(quantity: any, sellPrice: any){
    let total = Number(quantity)*Number(sellPrice)
    if(total){
      return total
    }
    return 0
  }

  public getSubtotal(){
    let sum = 0;
    this.productsInvoiceSelected.forEach(p => {
      sum += p.netPrice*p.quantity
    })
    this.subtotal = sum
  }

  public getTotalFinal(){
    let sum = 0;
    this.productsInvoiceSelected.forEach(p => {
      sum += p.sellPrice*p.quantity
    })
    this.total = sum
  }

  addProduct(product: any) {
    let productFound = this.productsInvoiceSelected.find(p=> p.id == product.id)
    if(!productFound) {
      this.productsInvoiceSelected = [...this.productsInvoiceSelected, product];
      this.productsInvoiceSelected = this.productsInvoiceSelected.filter((v, i) => this.productsInvoiceSelected.indexOf(v) == i)
    }
    this.getSubtotal()
    this.getTotalFinal()
  }

  onChange(product: any) {
    this.getSubtotal()
    this.getTotalFinal()
    if(!product.quantity){
      this.removeProduct(product)
    }
  }

  removeProduct(product: any) {
    this.productsInvoiceSelected = this.productsInvoiceSelected.filter(obj => obj !== product);
    this.getSubtotal()
    this.getTotalFinal()
  }

  selectProduct(event: any) {
    let product = event;
    this.products = []
    this.products.push(product)
    this.productsInvoice = []
    this.productsInvoice.push(product)
  }

  filterProduct(event: any) {
    this.getProductsByName(event.query)
  }

  saveInvoice() {
    console.log("save invoice")
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
