import {Component, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../../core/model/product.dto";

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {

  @ViewChild("productEditComponent") productEditComponent: any;
  @ViewChild("productListComponent") productListComponent: any;
  productSelected = new Product();
  displayDialog = false;

  constructor() { }

  ngOnInit(): void {
  }

  outputEmitProduct(event: Product) {
    this.productEditComponent.productEdit = event;
    this.productEditComponent.editar = true;
    this.productEditComponent.setProductForm();
    this.productSelected = event;
  }

  outputEmitProductSaved() {
    this.productListComponent.getProductsByName()
  }
}
