import { Component } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { UserService } from 'src/app/services/User/user.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  books: Book[] = [];
  public cartItems: number = 1;
  numberOfBooks: number = 0;
  userId!: number;
  cartId!: number;

  increase(book: Book) {
    if (this.cartItems < this.numberOfBooks) {
      this.cartItems = this.cartItems + 1;
    }
  }

  decrease(book: Book) {
    if (this.cartItems > 1) {
      this.cartItems = this.cartItems - 1;
    }
  }

  constructor(private bookService: BookService,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartService.getCartItem().subscribe(
      {
        next: (response => {
          this.books = response.object.cartItems;
          console.log("printit");
          console.log("books: " + response)
          console.log("book od book:", this.books);
        })
      })
  }

  customerDetails = true;
  placeOrder() {
    if (this.customerDetails) {
      this.customerDetails = !this.customerDetails;
      //get cart data of loggedin user
      // this.cartService.getCartItem().subscribe(
      //   response => {
      //     console.log("token");
      //   this.books=response.object.books;
      //   console.log("books are:",this.books)
      // })
    }
  }
  order = true;
  orderSummary() {
    if (this.order) {
      this.order = !this.order;
    }
  }

}
