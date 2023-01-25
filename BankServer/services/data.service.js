// import jwt token

const jwt=require('jsonwebtoken')

// import database

const db=require('./db')

// const { sign } = require("jsonwebtoken");

userDetails={
    1000:{acno:1000,username:"Sanil",password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:"Akhil",password:1001,balance:1000,transaction:[]},
    1002:{acno:1002,username:"Basil",password:1002,balance:1000,transaction:[]},
  }


const register=(acno,username,password)=>{

  return db.User.findOne({acno})
  .then(user=>{

    if(user){
      return {
        status:false,
        statusCode:400,
        message:"User already exist"
      }
    }
    else{
      const newUser=new db.User({
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
      })
      newUser.save();
     
      return {
        status:true,
        statusCode:200,
        message:"Register ssuccessfull"
      }
    }
      
    })
  }

  const login=(acno,pswd)=>{
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){
        currentUser=user.username;
        currentacno=acno;
        const token=jwt.sign({currentacno:acno},'privatekey')
        return {
          status:true,
          statusCode:200,
          message:"Login success",
          token:token,
          currentUser:currentUser,
          currentacno:currentacno
        }

      }
      else{
        return {
          status:false,
          statusCode:400,
          message:"Invalid login"
        }
      }
    })
  }
      // if(pswd=userDetails[acno]['password']){
      //   currentUser=userDetails[acno]['username'];
      //   currentacno=acno;
        
        
      //   const token=jwt.sign({currentacno:acno},'privatekey')
      //   return {
      //     status:true,
      //     statusCode:200,
      //     message:"Login success",
      //     token:token
      //   }
      // }
      // else {
      //   return {
      //     status:false,
      //     statusCode:400,
      //     message:"Password invalid"
      //   }
      // }
  //   }
  //   else {
  //     return {
  //       status:false,
  //       statusCode:400,
  //       message:"Invalid login"
  //     }
  //   }
  // }

 const deposit=(acno,pswd,amt)=>{
    // let userDetails=userDetails;
    var amount=parseFloat(amt);
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){

        user.balance+=amount;
        user.transaction.push({
          Type:`Credit`,
          Amount:amount
        })
        user.save();
        return {
          status:true,
          statusCode:200,
          message:`${amount} is credited and Balance is : ${user.balance}`
        }
      }
      else{
        return {
          status:false,
          statusCode:400,
          message:"Invalid user details"
        }
      }

      })
    }
    
  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno].password){
  //       userDetails[acno].balance+=amount;
  //       userDetails[acno].transaction.push({
  //         Type:`Credit`,
  //         Amount:amount
  //       })
        
  //       return {
  //         status:true,
  //         statusCode:200,
  //         message:`${amount} is credited and Balance is : ${userDetails[acno].balance}`
  //       }
  //     }
  //     else{
  //       // alert('Password incorrect');
  //       return {
  //         status:false,
  //         statusCode:400,
  //         message:"Password incorect"
  //       }
  //     }
  //   }
  //   else{
  //     return {
  //       status:false,
  //       statusCode:400,
  //       message:"Invalid user details"
  //     }
  //   }
  // }

  const withdraw=(acno,pswd,amt)=>{
    // let userDetails=userDetails;
    var amount=parseFloat(amt);
    return db.User.findOne({acno,pswd})
    .then(user=>{
      if(user){

        if(user.balance>=amount){
          user.balance-=amount;
          user.transaction.push({
            Type:`Debit`,
            Amount:amount
          })
          user.save();
          return {
            status:true,
            statusCode:200,
            message:`${amount} is debited and Balance is : ${user.balance}`
          }

        }
        else{
          return {
            status:false,
            statusCode:400,
            message:"Insufficient balance"
          }
        }

      }
      else{
        return {
          status:false,
          statusCode:400,
          message:"Invalid user details"
        }

      }
    })
  }
  //   if(acno in userDetails){
  //     if(pswd==userDetails[acno].password){
  //       if(userDetails[acno].balance>=amount){
  //       userDetails[acno].balance-=amount;
  //       userDetails[acno][`transaction`].push({
  //         Type:`Debit`,
  //         Amount:amount
  //       })
        
  //       return {
  //         status:true,
  //         statusCode:200,
  //         message:`${amount} is debited and Balance is : ${userDetails[acno].balance}`
  //       }
  //       }
  //       else{
  //         return {
  //           status:false,
  //           statusCode:400,
  //           message:"Insufficient balance"
  //         }
  //       }
  //     }
  //     else{
  //       return {
  //         status:false,
  //         statusCode:400,
  //         message:"Incorrect password"
  //       }
  //     }
  //   }
  //   else{
  //     return {
  //       status:false,
  //       statusCode:400,
  //       message:"Invalid user details"
  //     }
  //   }
  // }

  const getTransaction=(acno)=>{
    return db.User.findOne({acno})
    .then(user=>{
      if(user){
        return {
          status:true,
          statusCode:200,
        transaction:user.transaction
      }
      }
      else{
        return {
          status:false,
          statusCode:400,
          message:"Invalid transaction"
        }

      }
    })
   
}

//to delete an account

const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if (user) {
      return {
        status:true,
        statusCode:200,
        message:"User deleted successfully"
      }
    }
    else{
      return {
        status:false,
        statusCode:400,
        message:"User not found"
      }

    }
  })
}

  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }