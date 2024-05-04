import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StatesService } from '../common/service/states.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public myForm: any;
  public takeData: any = [];
  public flag: boolean = false;

  constructor(private fb: FormBuilder, private sd: StatesService , private route:Router) {
    this.myForm = this.fb.group({
      username: ['',Validators.required],
      email: ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['',Validators.required],
    });
  }

  val(){
   return this.myForm.controls;
  }


  OnSignUp() {
    this.flag = true;
    if(this.myForm.valid){
      alert('Sign Up Successfully...')
      this.flag = false;
      const signUpData = {
        username: this.myForm.value.username,
        email: this.myForm.value.email,
        password: this.myForm.value.password
      };
      this.takeData.push(signUpData);
      localStorage.setItem('takeData', JSON.stringify(this.takeData));
      console.log('Data stored in localStorage:', this.takeData);
      this.myForm.reset();
    }
  }


  
  ngOnInit(){
    const localIInfo = localStorage.getItem('takeData');
    if(localIInfo != null){
      this.takeData = JSON.parse(localIInfo)
    }
  }



  OnlogIn() {

    this.flag = true;
    if(this.myForm.valid){
    const loginUsername = this.myForm.value.username;
    const loginPassword = this.myForm.value.password;

    // Check if username and password match any stored user data
    const user = this.takeData.find((userData:any) => {
      return userData.username === loginUsername && userData.password === loginPassword;
    });

    if (user) {
      alert('Login successful')
      console.log('Login successful:', user);
      this.route.navigateByUrl('/about');
    } else {
      alert('Login failed. Invalid username or password.');
      console.log('Login failed. Invalid username or password.');
    }
    this.myForm.reset();
    }
  }
}
