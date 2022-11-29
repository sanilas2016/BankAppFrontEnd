import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  aim="Your Perfect Banking Partner";

  acno='';
  pswd='';
  uname='';


  registerForm=this.fb.group({

    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

  })


  

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){

    console.log(this.registerForm);
    

    var username=this.registerForm.value.uname;  //getting value from register form
    var password=this.registerForm.value.pswd;
    var acno=this.registerForm.value.acno;

    if(this.registerForm.valid){

      console.log(this.registerForm.get('uname')?.errors);
      

    const result=this.ds.register(acno,username,password);
    if(result){
      alert('register successfull');
      this.router.navigateByUrl('');
    }
    else{
      alert('enter data');
      this.router.navigateByUrl('register');
    }
    
  }
  else{
    alert(`invalid entry`);
  }
}

}
