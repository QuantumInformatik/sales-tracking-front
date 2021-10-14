import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ToastrModule} from "ngx-toastr";

import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import {AppComponent} from './app.component';
import {AppRoutes} from './app.routing';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {ProductAdminComponent} from "./pages/products/product-admin/product-admin.component";
import {ProductEditComponent} from "./pages/products/product-edit/product-edit.component";
import {ProductListComponent} from "./pages/products/product-list/product-list.component";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TableModule} from "primeng/table";
import {ReportAdminComponent} from './pages/reports/report-admin/report-admin.component';
import {HttpClientModule} from "@angular/common/http";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {BrowserModule} from "@angular/platform-browser";
import { InvoiceAdminComponent } from './pages/invoice/invoice-admin/invoice-admin.component';
import { ProductInvoiceListComponent } from './pages/invoice/product-invoice-list/product-invoice-list.component';
import {TagModule} from "primeng/tag";
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProductAdminComponent,
    ProductEditComponent,
    ProductListComponent,
    ReportAdminComponent,
    InvoiceAdminComponent,
    ProductInvoiceListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule
  ],
  providers: [
    MessageService,
    FormBuilder,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
