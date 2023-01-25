// server - mongodb integration

// 1 import mongoose

const mongoose=require('mongoose');

// 2 stste connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',
{
    useNewUrlParser:true  // to avoid unwanted warnings
});

// define bank db model

const User=mongoose.model('User',
{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
});

module.exports={
    User
}