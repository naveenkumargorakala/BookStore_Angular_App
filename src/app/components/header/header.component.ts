import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  


  public books:Book[]=[];

  constructor(private bookService:BookService){}
  cartItems:number=5;
  
  search="";




}
