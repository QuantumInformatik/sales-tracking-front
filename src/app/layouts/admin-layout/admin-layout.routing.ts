import {Routes} from '@angular/router';
import {ProductAdminComponent} from "../../pages/products/product-admin/product-admin.component";
import {ReportAdminComponent} from "../../pages/reports/report-admin/report-admin.component";
import {InvoiceAdminComponent} from "../../pages/invoice/invoice-admin/invoice-admin.component";

export const AdminLayoutRoutes: Routes = [
  { path: 'products',      component: ProductAdminComponent },
  { path: 'invoice',      component: InvoiceAdminComponent },
  { path: 'reports',      component: ReportAdminComponent },
];
