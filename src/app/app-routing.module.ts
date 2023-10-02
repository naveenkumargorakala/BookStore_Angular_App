import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { OrderComponent } from './components/order/order.component';
import { LoginModule } from './modules/login/login/login.module';
import { AuthGuard } from './components/guard/auth.guard';

const routes: Routes = [

  { path:'login', component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'' ,redirectTo:'/login',pathMatch:'full'},
  { path:'forgotpassword', component:ForgotpasswordComponent, },
  { path:'home', component:HomeComponent}, 
  { path:'cart' , component:CartComponent},
  { path:'order' , component:OrderComponent},   
  { path:'**' , component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
