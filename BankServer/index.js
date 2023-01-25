// server creation



// 1 impoer express

const express=require('express')
const res = require('express/lib/response')
const jsonwebtoken = require('jsonwebtoken')

    // import dataService

    const dataService=require('./services/data.service')

    // import cors

    const cors=require('cors')

   

// 2 create an application for express

const app=express()


 // give command to share data via cors

 app.use(cors({
    origin:'http://localhost:4200'
}))

    // to parse json from req body

    app.use(express.json())

// 3 create port number (for backend)

app.listen(3000,()=>{
    console.log('Lisstening on port 3000');
})

// application specific middleware

const appMiddleware=(req,res,next)=>{
    console.log('application specific middleware');
    next();
}
app.use(appMiddleware)

// router specific middleware
const jwt=require('jsonwebtoken')
const jwtMiddleware=(req,res,next)=>{
    console.log('router specific middleware');
    const token=req.headers['x-axis-token'];

    //varify token

    const data=jwt.verify(token,'privatekey')
    console.log(data);
    next();
}

// 4 resolving http request

// // get http request

//     app.get('/',(req,res)=>{
//          res.send('Get request');
//             })

// // post http request

//         app.post('/',(req,res)=>{
//             res.send('Post request');
//         })

// // put request  == to update

//         app.put('/',(req,res)=>{
//             res.send('Put request');
//         })

// // delete request

//         app.delete('/',(req,res)=>{
//             res.send('Delete request');
//         })

// // patch request

//         app.patch('/',(req,res)=>{
//             res.send('Patch request');
//         })
        



// API call

// registration request

app.post('/register',(req,res)=>{
    console.log(req.body);
    dataService.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })

    
    
})


// login request

app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acno,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })
    
})


//deposit request

app.post('/deposit',jwtMiddleware,(req,res)=>{
    console.log(req.body);
dataService.deposit(req.body.acno,req.body.password,req.body.amount)
.then(result=>{
    res.status(result.statusCode).json(result);
})

   
})

//withdraw request

app.post('/withdraw',jwtMiddleware,(req,res)=>{
    console.log(req.body);
dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount)
.then(result=>{
    res.status(result.statusCode).json(result);
})

    
})

// transaction request

app.post('/transaction',jwtMiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })

    
})

//delete request

app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result);
    })

    
})


