import { Component, OnInit } from '@angular/core';
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

  

  //class - collection of properties and methods
  //properties/variables
  //user defined methods   (4th execution)

  
  
  // dependency injection
  constructor(private ds:DataService, private router:Router) {  //(ist execution)
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
    var acno=this.acno;
    var pswd=this.pswd;
    var userDetails=this.ds.userDetails;

    var result=this.ds.login(acno,pswd);

    if(result){

      alert("Login successfull");
       this.router.navigateByUrl('dashboard');
    }
    else{
      alert('Login failed');
    }

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

