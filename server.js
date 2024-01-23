const express = require("express");
const bodyParser= require('body-parser');
const cors= require('cors');
const app = express();
const bcrypt = require('bcrypt');
const db = require('knex')({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'postgres',
        password:'test',
        database:'smartbrain'
    }
});

app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res)=>{
   res.json(database.users);   
})
// SIGNIN END POINT
app.post('/signin',(req,res)=>{
   const {email,password} = req.body;
    db.select('*').from('login').where({email:email})
    .then(resp=>{
        if(resp[0]){
           if(bcrypt.compareSync(password,resp[0].hash)){
                db('*').from('users').where({email:email})
                .then(user=>{
                    return res.json(user[0]);
                })
                .catch(err=>{
                    return res.status(400).json('error retrieving the user data!`')
                })
           }
           else{
            return res.status(400).json('password is incorrect!!')
           }
        }
        else{
            return res.status(400).json('email not found!')
        }
    })
    .catch(err=>{
        return res.status(400).json('error doing the signin'+err)
    })

})

// REGISTER END POINT
app.post('/register',(req,res)=>{
    const {name, email, password}= req.body;
    const saltRounds = 10;
   const hashedPassword = bcrypt.hashSync(password,saltRounds);
   console.log(hashedPassword);
  db.transaction((trx)=>{
    return trx('login')
    .insert({
        email,hash:hashedPassword
    })
    .returning('*')
    .then(data=>{
       return trx('users').insert({name,email:data[0].email,joined: new Date()}).returning('*')
    })
    .then(user=>{
     return res.json(user[0]);
    })
    .catch(err=>{
        console.log('error adding the user to database');
        res.json('error adding the user!!')
    })
  })
})


app.get('/profile/:id',(req,res)=>{
    const {id}= req.params;
    db.select('*').from('users').where({id})
    .then(user=>{
        if(user.length){
            res.json(user[0]);
        }
        else{
            res.status(400).json('not found')
        }
    })
    .catch(err=>res.status(400).json('error getting profile!!'))

})

app.put('/image',(req,res)=>{

    const {id}= req.body;
    db('users').where('id','=',id).increment('entries',1).returning('entries').then(entries=>{
        res.json(entries);
    })
    .catch(err=>{
        res.status(400).json('unable to update entries!!')
    })
  
})
// Routes that we have to add to over app
// profile route GET request '/profile/:userId'
//signin route POST request '/signin'
//register route POST request '/register'
// image checking route PUT request '/profile'




app.listen(3000,()=>{
    console.log('app is listening on port 3000...')
    
})