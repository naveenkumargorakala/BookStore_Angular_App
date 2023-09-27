import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  password: string = '';
  showPassword: boolean = false;

  //password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
 public user=new User;


ngOnInit(): void {
  if(localStorage.getItem('authToken')){
    this.http.user().subscribe(response => {
      console.log("sss: "+response)
    }
    );
  }
}
  //create a variable type formgroup
  registrationFormGroup: FormGroup;

   constructor(private formBuilder:FormBuilder, 
               private http:UserService,
               private router:Router,
               private snackBar:MatSnackBar,
               
              ){
                this.registrationFormGroup=this.formBuilder.group({
                  firstName: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-Z\\s]{2,}$")]),
                  lastName:   new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z-' ]{2,20}$/)]),
                  email:     new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
                  address:   new FormControl ('', [Validators.required]),
                  phoneNumber:new FormControl('', [Validators.required]),
                  date:"1999-09-03",
                  password:   new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,}$/)]),
                })
    }
 
 
 
 
    onSubmit() {
      if (this.registrationFormGroup.invalid) {
        return;
      }
      // Get the user data from the form
     this.user = this.registrationFormGroup.value;
      // Send the user data to the backend using an HTTP POST request
      this.http.addUser(this.user).subscribe(response => {
        console.log(response.object); // Log the response from the backend
        this.router.navigateByUrl("/home"); // Navigate to the "home" route after successful submission
        this.snackBar.open('User Added Successfully', 'OK', { duration: 4000, verticalPosition: 'top' }); // Show a success message
      });
    }
    

    





  }














  
  
  


