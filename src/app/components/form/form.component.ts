import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  


  public books:Book[]=[];

  constructor(private bookService:BookService){}
  cartItems:number=5;
  
  search="";




}
