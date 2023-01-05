import { transition } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
 headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser="";
  currentacno="";

  constructor(private http:HttpClient) {
    // this.getDetails();
   }


  //saveDetails

  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('DataBase',JSON.stringify(this.userDetails));
    }

    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser));
    }

    if(this.currentacno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentacno));
    }
  }

  getDetails(){
    if(this.userDetails){
      this.userDetails=JSON.parse(localStorage.getItem('DataBase')||'');
    }
    if(this.currentUser){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'');
    }
    if(this.currentacno){
      this.currentacno=JSON.parse(localStorage.getItem('currentAcno')||'');
    }
  }



  userDetails:any={
    1000:{acno:1000,username:"Sanil",password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:"Akhil",password:1001,balance:1000,transaction:[]},
    1002:{acno:1002,username:"Basil",password:1002,balance:1000,transaction:[]},
  }

  register(acno:any,username:any,password:any){

    const data={
      acno,
      password,
      username
    }

    return this.http.post('http://localhost:3000/register',data)

    // let userDetails=this.userDetails;
    // if(acno in userDetails){
    //   return false;
    // }
    // else{
    //   userDetails[acno]={
    //     acno:acno,
    //     username:username,
    //     password:password,
    //     balance:0,
    //     transaction:[]
    //   }
    //   console.log(userDetails);
    //   this.saveDetails();
    //   return true;
      
    // }
  }

  login(acno:any,pswd:any){

    const data={
      acno,
      pswd
    }

    return this.http.post('http://localhost:3000/login',data)

    // let userDetails=this.userDetails;
    // if(acno in userDetails){
    //   if(pswd=userDetails[acno].password){
    //     this.currentUser=userDetails[acno].username;
    //     this.currentacno=acno;
    //     this.saveDetails();
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // }
    // else {
    //   return false;
    // }

    
  }

  getToken(){

    //get token
    const token=JSON.parse(localStorage.getItem('token')||'');

    //append token

    let headers=new HttpHeaders()

    if(token){
        options.headers=headers.append('x-axis-token',token)
    }
    return options;

  }


  deposit(acno:any,pswd:any,amt:any){
    const data={
      acno,
      pswd,
      amount:amt
    }

    return this.http.post('http://localhost:3000/deposit',data,this.getToken())

    // let userDetails=this.userDetails;
    // var amount=parseFloat(amt);
    
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno].password){
    //     userDetails[acno].balance+=amount;
    //     userDetails[acno].transaction.push({
    //       Type:`Credit`,
    //       Amount:amount
    //     })
    //     console.log(userDetails);
    //     this.saveDetails();
        
        
    //     return userDetails[acno].balance;
    //   }
    //   else{
    //     alert('Password incorrect');
    //     return false;
    //   }
    // }
    // else{
    //   return false;
    // }
  }


  withdraw(acno:any,pswd:any,amt:any){

    const data={
      acno,
      pswd,
      amount:amt
    }

    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())

    // let userDetails=this.userDetails;
    // var amount=parseFloat(amt);
    
    // if(acno in userDetails){
    //   if(pswd==userDetails[acno].password){
    //     if(userDetails[acno].balance>=amount){
    //     userDetails[acno].balance-=amount;
    //     userDetails[acno][`transaction`].push({
    //       Type:`Debit`,
    //       Amount:amount
    //     })
    //     this.saveDetails();
    //     return userDetails[acno].balance;
    //     }
    //     else{
    //       alert('Insufficient balance');
    //       return false;
    //     }
    //   }
    //   else{
    //     alert('Password incorrect');
    //     return false;
    //   }
    // }
    // else{
    //   return false;
    // }
  }

  getTransaction(acno:any){

    const data={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',data,this.getToken())
  }


deleteAcc(acno:any){

  return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
}
 
}
