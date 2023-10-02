import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { Cart } from 'src/app/models/cart/cart.model';
import { UserService } from 'src/app/services/User/user.service';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numberOfBooks = 0;
  userId!: number;
  public cart:Cart={ bookId: 0, quantity: 0 };
  public books: Book[] = [];
  order: string[] = [
    "low-high", "high-low", "newest"];

  search: string = "";
  constructor(private bookService: BookService,
    private cartService: CartService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.search == "") {
      this.bookService.getBooks().subscribe(response => {
        this.books = response.object;
        console.log(this.books);
        this.numberOfBooks = this.books.length;
      })
    }
    else {
      this.bookService.getBookByName(this.search).subscribe(response => {
        this.books = response.object;
        console.log(this.books);
        this.ngOnInit();
      })
    }
    // clear cart data
    this.cartService.clearCart();
  }

  // added:boolean=true;
  onClick(book: Book) {
    this.cart.bookId=book.bookId;
        this.cart.quantity=1;
        if (!book.added) {
          // If the book is not added to the cart, add it
          this.cartService.addToCart(this.cart).subscribe({
            next: (response => {
              console.log("cartbook:",this.cart.bookId)
              console.log("carrrtt:",this.cart);
              console.log("Added to cart:", response);
              book.added = true; // Set added to true when the book is added to the cart
            })
          });
        } else {
          // If the book is already added to the cart, remove it
          book.added = false; // Set added to false when the book is removed from the cart
          this.cartService.decrementItemCount(book.bookId);
          this.cartService.removeIem(this.cart).subscribe({
            next: (response => {
              console.log("Removed from cart:", response);
            })
          });
        }
      }
}


