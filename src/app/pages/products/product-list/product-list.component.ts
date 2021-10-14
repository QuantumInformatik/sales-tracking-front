import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Product} from "../../../core/model/product.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {ProductService} from "../../../core/services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  @Output() outputEmitProduct: EventEmitter<any> = new EventEmitter();
  products: Array<Product> = [];
  totalRecords = 0;
  loading = false;
  public sortField = 'id';
  public sortOrder = 1;
  productSelected = new Product();

  productName: any;
  productFind = new Product();

  public cols: any[] | undefined;

  constructor( private router: Router, private route: ActivatedRoute,
               private confirmationService: ConfirmationService, private productService: ProductService,
               private messageService: MessageService,) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'Code', width: '140px',sort: true, align: 'left' },
      { field: 'name', header: 'Name', width: '140px',sort: true, align: 'left' },
      { field: 'providerName', header: 'Provider', width: '140px',sort: true, align: 'left' },
      { field: 'stock', header: 'Stock', width: '140px',sort: true, align: 'left' },
      { field: 'netPrice', header: 'Net price', width: '140px',sort: true, align: 'left' },
      { field: 'sellPrice', header: 'Sell price', width: '140px',sort: true, align: 'left' },
      { field: 'actions', header: 'Actions', width: '140px', align: 'left' },
    ];
    this.getProductsByName()

  }

  getProductsByName(name?: any): void {
    this.loading = true;
    this.sub.add(this.productService.getProducts(name).subscribe(data => {
      this.products = data.body;
      this.totalRecords = data.length;
    }, error => {
      this.loading = false;
      console.error('Error: ' + error);
    }, () => {
      this.loading = false;
    }));
  }

  editProduct(product: Product) {
    this.productSelected = product;
    this.outputEmitProduct.emit(product);
  }

  deleteProduct(product: any) {
    this.loading = true;
    this.sub.add(this.productService.deleteProduct(product.id).subscribe(data => {
      this.getProductsByName()
      this.messageService.add({severity: 'success', summary: 'Success', detail: ''});
    }, error => {
      this.messageService.add({severity: 'error',summary: 'Error', detail: ''});
      console.error('Error: ' + error);
    }, () => {
    }));
  }

  confirmDelete(product: Product): void {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProduct(product);
      },
      reject: () => {}
    });
  }

  selectProduct(event: any) {
    let product = event;
    this.products = []
    this.products.push(product)
  }

  filterProduct(event: any) {
    this.getProductsByName(event.query)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
