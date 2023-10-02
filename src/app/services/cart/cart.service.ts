import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userId!:number;
  

  constructor(private http:HttpClient) { }

  // an observable cartItems$ that emits changes to the count and itemIds properties of a shopping cart.
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

 

  //send data to backend by url
  addToCart(cart:any):Observable<any> {
    const token = localStorage.getItem('authToken');
    // const cartJSON = JSON.stringify(cart);
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.http.post('http://localhost:8080/cart/addtocart/'+token,cart);
  }

  // addToCart(cart:any):Observable<any> {
  //   const token = localStorage.getItem('authToken');
  //   const cartJSON = JSON.stringify(cart);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.http.post('http://localhost:8080/cart/addtocart/'+token,cartJSON,{ headers });
  // }

  //get data from url
  getCartItems():Observable<any>{
    return this.http.get('http://localhost:8080/cart/getallcartdata')
  }

  getCartId(usedId:number):Observable<any>{
    return this.http.get('http://localhost:8080/cart/cartId/'+usedId);
  }

  updateCartById(cart:any,):Observable<any>{
    const token = localStorage.getItem('authToken');
    return this.http.put('http://localhost:8080/cart//updatecartquantity/'+token,cart);
  }
  

  //getcartitems bu token from bakend
  getCartItem():Observable<any>{
    const token = localStorage.getItem('authToken');
    return this.http.get('http://localhost:8080/cart/getcartbyusertoken/'+token)
  }

  removeIem(cart:Cart):Observable<any>{
    const token = localStorage.getItem('authToken');
    return this.http.put('http://localhost:8080/cart/removecartItem/'+token,cart)
  }
}
