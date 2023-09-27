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

  cartItemCount: number = 0;

  user!: User;
  token: any;
  logg: string = '';
  userId: number = 0;
  quantity: number = 1;


  ngOnInit() {
    // Subscribe to cartItems$ to get cart data
    this.cartService.cartItems$.subscribe(response => {
      this.cartItemCount = response.count;
    });
    if (this.token) {
      this.logg = "Logout"
    }
    else
      this.logg = "Login"
  }

  logout() {
    localStorage.removeItem("authToken");
    this.router.navigateByUrl('/login');
  }

  onSubmit() {
    this.cartService.cartItems$.subscribe(response => {
      this.cartItemCount = response.count;
      this.bookIds = response.itemIds;
      console.log(this.bookIds);
    });

    // Subscribe to userService.user() to get user data
    this.userService.user().subscribe(response => {
      this.user = response.object; 
      this.userId = this.user.userID; 
      console.log("user: " + this.userId);
    });

    if (!this.cart) {
      this.cart = {
        userId: this.userId, 
        bookIds: this.bookIds, 
        quantity: this.quantity, 
      };
    }

    console.log("carttd=afa: "+this.cart)
    this.cartService.addToCart(this.userId,this.bookIds,this.quantity).subscribe(response => {
      console.log("cart: " + response);
    })
  }

}
