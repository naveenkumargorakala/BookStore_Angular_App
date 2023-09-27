import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  numberOfBooks=0;

  public books:Book[]=[];
  order: string[] = [
   "low-high","high-low","newest"
  ];

  search:string="";
  constructor(private bookService:BookService,
    private cartItems:CartService
    ){}

  ngOnInit(): void {
    if(this.search==""){
      this.bookService.getBooks().subscribe(response =>{
        this.books=response.object;
        console.log(this.books);
        this.numberOfBooks=this.books.length;
      })}
      else{
        this.bookService.getBookByName(this.search).subscribe(response => {
          this.books=response.object;
          console.log(this.books);
          this.ngOnInit();
        })
      }
  }

  // added:boolean=true;
  onClick(book:Book){
    if (!book.added){
    this.bookService.getBookById(book.bookId).subscribe(response => {
      console.log("Clicked")
      book.added=true;
      this.cartItems.incrementItemCount(book.bookId);
    });
    }else{
    book.added=false;
    this.cartItems.decrementItemCount(book.bookId);
    }
    
    }

  }



