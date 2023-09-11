import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  numberOfBooks=12;

  public books:Book[]=[];
  order: any = [
    {value: 'ascending', viewValue: 'ascending'},
    {value: 'descending', viewValue: 'descending'},
    {value: 'inserting', viewValue: 'inserting'},
  ];

  constructor(private bookService:BookService){}

  ngOnInit(): void {
      this.bookService.getBooks().subscribe(response =>{
        this.books=response.object;
        console.log(this.books);
        this.numberOfBooks=this.books.length;
      })
  }

  added:boolean=true;
  onClick(){
    if (this.added){
    this.added=false;
    }else
    this.added=true;

  }

}
