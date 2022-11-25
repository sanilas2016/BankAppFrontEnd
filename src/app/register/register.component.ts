import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  acno='';
  pswd='';
  uname='';

  constructor(private router:Router,private ds:DataService) { }

  ngOnInit(): void {
  }

  register(){

    var username=this.uname;
    var password=this.pswd;
    var acno=this.acno;

    var result=this.ds.register(acno,username,password);
    if(result){
      alert('register successfull');
      this.router.navigateByUrl('');
    }
    else{
      alert('enter data');
      this.router.navigateByUrl('register');
    }
    
  }

}
