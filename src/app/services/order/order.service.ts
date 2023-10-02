import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order: Book[] = [];
  private orderSubject = new BehaviorSubject<Book[]>([]);

  constructor() { }
   // an observable cartItems$ that emits changes to the count and itemIds properties of a shopping cart.
   private orderItems = new BehaviorSubject<{ itemIds: number[] }>({  itemIds: [] });
   orderItems$ = this.orderItems.asObservable();
 
   addToOrder(book: Book) {
    this.order.push(book);
    this.orderSubject.next([...this.order]);
  }

  removeFromOrder(book: Book) {
    const index = this.order.findIndex(b => b.bookId === book.bookId);
    if (index !== -1) {
      this.order.splice(index, 1);
      this.orderSubject.next([...this.order]);
    }
  }
 
   // Clear the cart
   clearOrderItems(): void {
     this.orderItems.next({ itemIds: [] });
   }
 
}
