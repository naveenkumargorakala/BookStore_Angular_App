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
  order: string[] = [
   "low-high","high-low","newest"
  ];

  search:string="";
  constructor(private bookService:BookService){}

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
        })
      }
  }

  added:boolean=true;
  onClick(id:number){
    if (this.added){
    this.bookService.getBookById(id).subscribe(response => {
      console.log("Clicked")
      this.added=false;
    })
    }else
    this.added=true;

  }

  // remove(id: number): void {
  //   this.httpService.deleteEmployee(id).subscribe(response => {
  //     console.log("deleted Succesfully");
  //     this.ngOnInit();
  //   })
  // }

}
