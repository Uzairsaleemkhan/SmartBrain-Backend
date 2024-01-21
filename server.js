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

const database =  {
    users:[
        {
            name:'bais',
            email:'bais@gmail.com',
            password:'abumusal',
            joined:'2001-11-11',
            id:'1222',
            entries:0
        }
    ]
}

app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res)=>{
   res.json(database.users);   
})

app.post('/signin',(req,res)=>{
    if(req.body.email===database.users[0].email&&  
        req.body.password===database.users[0].password){
            res.json(database.users[0]);
        }
    else{
        res.status(400).json('error logging in!')
    }
})


app.post('/register',(req,res)=>{
    const {name, email, password}= req.body;
    db('users')
    .returning('*')    
    .insert({
        name:name,
        email:email,
        joined: new Date()
    })
    .then(data=> res.json(data[0]))
    .catch(err=>{
        console.log(err,'error adding user')
        res.status(400).json('error adding the user!')
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