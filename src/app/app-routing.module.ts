import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { path:'a', component:HomeComponent}, 

  { path:'' , component:CartComponent}
  // { path:'' , component:FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
