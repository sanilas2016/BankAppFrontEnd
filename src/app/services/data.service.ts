import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userDetails:any={
    1000:{acno:1000,username:"Sanil",password:1000,balance:1000},
    1001:{acno:1001,username:"Akhil",password:1001,balance:1000},
    1002:{acno:1002,username:"Basil",password:1002,balance:1000}
  }

  register(acno:any,username:any,password:any){
    let userDetails=this.userDetails;
    if(acno in userDetails){
      return false;
    }
    else{
      userDetails[acno]={
        acno:acno,
        username:username,
        password:password,
        balance:0
      }
      console.log(userDetails);
      return true;
      
    }
  }

  login(acno:any,pswd:any){
    let userDetails=this.userDetails;
    if(acno in userDetails){
      if(pswd=userDetails[acno].password){
        return true;
      }
      else{
        return false;
      }
    }
    else {
      return false;
    }
  }

  deposit(acno:any,pswd:any,amt:any){
    let userDetails=this.userDetails;
    var amount=parseFloat(amt);
    
    if(acno in userDetails){
      if(pswd==userDetails[acno].password){
        userDetails[acno].balance+=amount;
        return userDetails[acno].balance;
      }
      else{
        alert('Password incorrect');
        return false;
      }
    }
    else{
      return false;
    }
  }


  withdraw(acno:any,pswd:any,amt:any){
    let userDetails=this.userDetails;
    var amount=parseFloat(amt);
    
    if(acno in userDetails){
      if(pswd==userDetails[acno].password){
        if(userDetails[acno].balance>=amount){
        userDetails[acno].balance-=amount;
        return userDetails[acno].balance;
        }
        else{
          alert('Insufficient balance');
        }
      }
      else{
        alert('Password incorrect');
        return false;
      }
    }
    else{
      return false;
    }
  }

  constructor() { }
}
