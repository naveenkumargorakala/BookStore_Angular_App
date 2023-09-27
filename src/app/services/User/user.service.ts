import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  addUser(user:any):Observable<any>{
    return this.http.post('http://localhost:8080/user/register',user)
  }

  // token:any=localStorage.getItem('authToken');
  
  // user():Observable<any>{
  //   return this.http.get('http://localhost:8080/user/retrieve',this.token)
  // }
  
  user(): Observable<any> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    // Create headers with the token
    const headers = new HttpHeaders({
      'Authorization': `${token}`, // Assuming it's a Bearer token
    });
    // Include headers in the request
    const options = { headers: headers };
    // Make the GET request with headers
    return this.http.get('http://localhost:8080/user/retrieve', options);
  }

}
