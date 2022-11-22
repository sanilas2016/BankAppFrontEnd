import { Component, OnInit } from '@angular/core';

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

  userDetails:any={
    1000:{acno:1000,username:"Sanil",password:1000,balance:1000},
    1001:{acno:1001,username:"Akhil",password:1001,balance:1000},
    1002:{acno:1002,username:"Basil",password:1002,balance:1000}
  }

  //class - collection of properties and methods
  //properties/variables
  //user defined methods   (4th execution)

  constructor() {  //(ist execution)
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

  login(){
    // alert("Login Clicked");
    var acno=this.acno;
    var pswd=this.pswd;
    var userDetails=this.userDetails;

  //   if (acno in userDetails && pswd==userDetails[acno].password) {
  //     alert("Login successfull");
  //   }
  //   else{
  //     alert('Invalid user details');
  // }
    if(acno in userDetails){
      if(pswd==userDetails[acno].password){
        alert("Login successfull");
      }
      else{
        alert('Invalid password');
      }
    }
    else{
      alert('Invalid user details');
  }

  }


}

