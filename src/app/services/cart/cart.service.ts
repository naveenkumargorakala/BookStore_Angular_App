import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  addToCart(userId:number,bookIds:number[],quantity:number):Observable<any> {
    return this.http.post('http://localhost:8080/cart/addtocart',{userId,bookIds,quantity});
  }


  private cartItemsSubject = new BehaviorSubject<{ count: number, itemIds: number[] }>({ count: 0, itemIds: [] });
  cartItems$ = this.cartItemsSubject.asObservable();

  // Add item to the cart
  incrementItemCount(itemId: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = {
      count: currentCart.count + 1,
      itemIds: [...currentCart.itemIds, itemId]
    };
    this.cartItemsSubject.next(updatedCart);
  }

  // Remove item from the cart
  decrementItemCount(itemId: number): void {
    const currentCart = this.cartItemsSubject.value;
    const itemIndex = currentCart.itemIds.indexOf(itemId);
    if (itemIndex !== -1) {
      currentCart.itemIds.splice(itemIndex, 1);
      const updatedCart = {
        count: currentCart.count - 1,
        itemIds: currentCart.itemIds
      };
      this.cartItemsSubject.next(updatedCart);
    }
  }

  // Clear the cart
  clearCart(): void {
    this.cartItemsSubject.next({ count: 0, itemIds: [] });
  }

}
