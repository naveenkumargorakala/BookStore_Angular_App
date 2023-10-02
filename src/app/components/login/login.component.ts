import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/models/login/login.model';
import { UserService } from 'src/app/services/User/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm:Login=new Login();
  loginFormGroup!:FormGroup;
  password: string = '';
  showPassword: boolean = false;
  userId!:number;
  subscription!:Subscription;
  //password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  
  // loginForm!:FormGroup ;
  onSubmit(){
   this.loginForm=this.loginFormGroup.value;
   if(this.loginForm){
    this.subscription=this.authService.login(this.loginForm).subscribe(
      {
        next:(response)=>{
          console.log(response);
            this.router.navigateByUrl("/home");
            const token = response['token: '+response.object];
            localStorage.setItem('authToken', response.object);
            this.snackBar.open('Login Successfully!',' OK', {duration:4000,verticalPosition:'top'})
        },error:(err)=>{
          this.snackBar.open('Login Details are Invalid',err, {duration:4000,verticalPosition:'top'})
        }
      });
    }
  }

  constructor(private authService:AuthService,
    private snackBar:MatSnackBar,
    private router:Router,
    private formBuilder: FormBuilder,
    private userService:UserService){
      this.loginFormGroup= this.formBuilder.group({
        email: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
        password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/)]),
      })
     }

}
