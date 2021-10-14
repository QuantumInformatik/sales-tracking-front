import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../core/model/product.dto";
import {Subscription} from "rxjs";
import {ProductService} from "../../../core/services/product.service";
import {Provider} from "../../../core/model/provider.dto";
import {ProviderService} from "../../../core/services/provider.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  @Input() productEdit: any | undefined;
  @Output() outputEmitProductSaved: EventEmitter<any> = new EventEmitter();
  private sub: Subscription = new Subscription();
  providers: Provider[]
  providerSelected: Provider;
  form: FormGroup;
  disableButton: boolean = false;
  editar = false;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
              private productService: ProductService, private providerService: ProviderService,
              private messageService: MessageService,) {
    this.form = formBuilder.group({});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getProvidersByName()
    if(!ProductEditComponent.isEmptyObject(this.productEdit)){
      this.setProductForm();
    }
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      code: [null, Validators.required],
      stock: [null, Validators.required],
      providerId: [null, [Validators.required]],
      netPrice: [null, [Validators.required]],
      sellPrice: [null, [Validators.required]],
      timestamp: [null]
    });
  }

  public setProductForm() {
    let provider = new Provider()
    provider.id = this.productEdit.providerId
    provider.name = this.productEdit.providerName
    this.form.setValue({
      id: this.productEdit?.id,
      name: this.productEdit?.name,
      code: this.productEdit?.code,
      stock: this.productEdit?.stock,
      providerId: provider,
      netPrice: this.productEdit?.netPrice,
      sellPrice: this.productEdit?.sellPrice,
      timestamp: this.productEdit?.timestamp,
    });
  }

  buildForm(controls: any){
    let obj: any = {};
    for (const pro in controls) {
      if (controls[pro] && controls[pro].value != undefined) {
        obj[pro] = controls[pro].value;
      }
    }
    return<Product>{
      ...obj,
      providerId: obj['providerId'].id,
      timestamp: new Date()
    }
  }

  getProvidersByName(name?: any): void {
    this.sub.add(this.providerService.getProviders(name).subscribe(data => {
      this.providers = data.body;
    }, error => {
      console.error('Error: ' + error);
    }, () => {
    }));
  }

  selectProvider(event: any) {
    this.providerSelected = event.query
  }

  filterProvider(event: any) {
    this.getProvidersByName(event.query)
  }

  saveProduct() {
    this.disableButton = true;
    let product = this.buildForm(this.form.controls)
    if(!this.editar){
      this.sub.add(this.productService.saveProduct(product).subscribe(data => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: ''});
      }, error => {
        this.disableButton = false;
        console.error('Error: ' + error);
        this.messageService.add({severity: 'error',summary: 'Error', detail: ''});
      },() => {
        this.clearProduct()
        this.outputEmitProductSaved.emit();
        this.disableButton = false;
      }));
    }else{
      this.sub.add(this.productService.updateProduct(product).subscribe(data => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: ''});
      }, error => {
        this.messageService.add({severity: 'error',summary: 'Error', detail: ''});
        console.error('Error: ' + error);
      },() => {
        this.clearProduct()
        this.outputEmitProductSaved.emit();
        this.disableButton = false;
      }));
    }
  }

  private static isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  clearProduct() {
    this.form.reset();
    this.editar = false;
    this.providerSelected = this.providers[0];
  }
}
