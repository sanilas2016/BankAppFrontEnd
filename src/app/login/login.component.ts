import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { //(3rd execution)

  aim="Your Perfect Banking Partner";
  account="     Enter your account here";
  password="     Enter your password here";

  pswd='';
  acno='';

  loginForm=this.fb.group({

    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })


  

  //class - collection of properties and methods
  //properties/variables
  //user defined methods   (4th execution)

  
  
  // dependency injection
  constructor(private ds:DataService, private router:Router,private fb:FormBuilder) {  //(ist execution)
    // it automatically invokes when the project is created
  }

  ngOnInit(): void { //(2nd execution)
    //for initial process of component
    //lifecycle hook of Angular
  }


  acnochange(event:any){
    this.acno=event.target.value;
    console.log(this.acno);
    
  }
  pswdchange(event:any){
    this.pswd=event.target.value;
    console.log(this.pswd);
    
  }

  // login(a:any,p:any){
  //   // alert("Login Clicked");
  //   var acno=a.value;
  //   var pswd=p.value;
  //   var userDetails=this.userDetails;

  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno].password){
  //       alert("Login successfull");
  //     }
  //     else{
  //       alert('Invalid password');
  //     }
  //   }
  //   else{
  //     alert('Invalid user details');
  // }

  // }

  login(){
    // alert("Login Clicked");
    var acno=this.loginForm.value.acno;
    var pswd=this.loginForm.value.pswd;
    // var userDetails=this.ds.userDetails;

    if(this.loginForm.valid){

    this.ds.login(acno,pswd)
    .subscribe((result:any)=>{
      alert(result.message);
      this.router.navigateByUrl('dashboard');
      localStorage.setItem('currentUser',JSON.stringify(result.currentUser));
      localStorage.setItem('currentacno',JSON.stringify(result.currentacno));
      localStorage.setItem('token',JSON.stringify(result.token));
    },
    result=>{
      alert(result.error.message);
      
    }
    )

  //   if(result){

  //     alert("Login successfull");
  //      this.router.navigateByUrl('dashboard');
  //   }
  //   else{
  //     alert('Login failed');
  //   }
  // }
  // else{
  //   alert(`Invalid form`);
  // }

  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno].password){
  //       alert("Login successfull");
  //       this.router.navigateByUrl('dashboard');
  //     }
  //     else{
  //       alert('Invalid password');
  //     }
  //   }
  //   else{
  //     alert('Invalid user details');
  // }

  }


}
}

