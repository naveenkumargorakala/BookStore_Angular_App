import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login/login.model';
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

  //password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // loginForm!:FormGroup ;
  onSubmit(){
   this.loginForm=this.loginFormGroup.value;
   if(this.loginForm){
    this.authService.login(this.loginForm).subscribe(response => {
      console.log(response);
      this.router.navigateByUrl("/home");
      this.snackBar.open('Login Successfully!',' OK', {duration:4000,verticalPosition:'top'})

    })
   }
  }

  
  constructor(private authService:AuthService,
    private snackBar:MatSnackBar,
    private router:Router,
    private formBuilder: FormBuilder){
      this.loginFormGroup= this.formBuilder.group({
        email:     new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
        password:   new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/)]),
      })
     }

  //    onSubmit() {
  //     if (this.loginForm.invalid) {
  //       return;
  //     }
  //     console.log("login: "+this.loginForm);
  //       const { username, password } = this.loginForm.get("Credential")?.value;
  //       console.log("login1: "+this.loginForm);
  //       this.authService.login(this.loginForm).subscribe(response => {
  //         const token = response['token'];
  //         console.log("login2: "+this.loginForm);
  //       localStorage.setItem('authToken', token);
  //       })
  //     }


  // // onSubmit(username: string, password: string) {
  // //   this.authService.login(username, password).subscribe((response) => {
  // //       // Authentication successful, store the token and navigate to a protected route
  // //       const token = response['token'];
  // //       localStorage.setItem('authToken', token);
  // //       // Redirect to a protected route or perform other actions

  // //     },
  // //     (error) => {
  // //       // Handle authentication failure (e.g., display an error message)
  // //     }
  // //   );
  // // }
}
