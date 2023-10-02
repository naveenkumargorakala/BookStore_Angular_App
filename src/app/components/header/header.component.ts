import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Cart } from 'src/app/models/cart/cart.model';
import { Login } from 'src/app/models/login/login.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/User/user.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cart!: Cart;
  public books: Book[] = [];


  constructor(private bookService: BookService,
    private cartService: CartService,
    private router: Router,
    private userService: UserService) { }
  // cartItems:number=5;
  bookIds: number[] = [];
  search = "";
  email: any = localStorage.getItem('email');
  cartItemCount: number = 0;
  user!: User;
  userId: number = 0;
  token: any;
  logg: string = '';
  quantity: number = 1;
  cartId!: number;




  ngOnInit() {
    // Subscribe to cartItems$ to get cart data
    this.cartService.cartItems$.subscribe(response => {
      this.cartItemCount = response.count;
    });
    token: String;
    this.token = localStorage.getItem('authToken')
    if (this.token) {
      this.logg = "Logout"
    }
    else
      this.logg = "Login"
  }

  //logout from the app
  logout() {
    localStorage.removeItem("authToken");
    this.cartService.clearCart();
    this.router.navigateByUrl('/login');
  }


  count: number = 0;
  onClick() {
    
  }
}