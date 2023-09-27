import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { OrderComponent } from './components/order/order.component';
import { LoginModule } from './modules/login/login/login.module';

const routes: Routes = [

  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'' ,redirectTo:'/login',pathMatch:'full'},
  // {
  //   path: 'login',
  //   // loadChildren: () => import('../modules/login.module').then(m => LoginModule)
  //   comp
  // },
  { path:'home', component:HomeComponent}, 
  { path:'cart' , component:CartComponent},
  { path:'header' , component:HeaderComponent}, 
  { path:'forgotpassword', component:ForgotpasswordComponent},
  { path:'order' , component:OrderComponent},   
  { path:'**' , component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
