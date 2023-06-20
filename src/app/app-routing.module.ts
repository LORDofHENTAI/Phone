import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneBookComponent } from './components/phone-book/phone-book.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: PhoneBookComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
