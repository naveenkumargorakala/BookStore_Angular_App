import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
    private router: Router) { }

  login(login:any): Observable<any>{
    return this.http.post('http://localhost:8080/user/login',login)
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') === 'true';
  }
}