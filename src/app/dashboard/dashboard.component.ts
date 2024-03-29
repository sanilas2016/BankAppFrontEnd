import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  acno="";
  pswd="";
  amount="";
  acno1="";
  pswd1="";
  amount1="";

  user="";
  

  sdate:any;

  

  depositForm=this.fb.group({

    
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })
  withdrawForm=this.fb.group({

    
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]],

  })

  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    if(localStorage.getItem('currentUser')){
      this.user=JSON.parse(localStorage.getItem('currentUser')||'');
      this.user=this.user.toUpperCase()
    }
    
    this.sdate=new Date();
   }

  ngOnInit(): void {
    if(!localStorage.getItem('currentUser')){
      alert(`Please login first`);
      this.router.navigateByUrl('');
    }
    
  }

  deposit(){
    var acno=this.depositForm.value.acno;
    var pswd=this.depositForm.value.pswd;
    var amount=this.depositForm.value.amount;
    

    if(this.depositForm.valid){
    this.ds.deposit(acno,pswd,amount)
    .subscribe((result:any)=>{

      alert(result.message);

    },
    result=>{
      alert(result.error.message);
    }
    )
//     if(result){
//         alert(`${amount} is credited...Available balance is ${result}` );
//     }
// else{
//   alert(`Transaction error`);
// }
//     }
//     else{
//       alert(`Invalid transaction`);
//     }
  }
}
  withdraw(){
    var acno=this.withdrawForm.value.acno1;
    var pswd=this.withdrawForm.value.pswd1;
    var amount=this.withdrawForm.value.amount1;

    if(this.withdrawForm.valid){


    this.ds.withdraw(acno,pswd,amount)
    .subscribe((result:any)=>{

      alert(result.message);
    },
    result=>{
      alert(result.error.message);
    })
    // if(result){
    //     alert(`${amount} is debited...Available balance is ${result}` );
    // }
    // else{
    //   alert(`Transaction error`);
    // }
    //     }
    //     else{
    //       alert(`Invalid transaction`);
    //     }
}
  }

logout(){
  localStorage.removeItem('currentacno');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  this.router.navigateByUrl('');
}

// delete(){
//     this.acno=JSON.parse(localStorage.getItem('currentAcno')||'');
// }
delete(){
  this.acno=JSON.parse(localStorage.getItem('currentacno')||'')
}

onCancel(){
  this.acno='';
}

onDelete(event:any){
  // alert(event)
  this.ds.deleteAcc(event)
  .subscribe((result:any)=>{
    alert(result.message)
    // this.router.navigateByUrl('');
    this.logout()
  },
  result=>{
    alert(result.error.message)
  })
}

}
