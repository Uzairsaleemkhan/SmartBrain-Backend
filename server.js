const express = require("express");
const bodyParser= require('body-parser');
const cors= require('cors');
const app = express();
const database={
    users:[
        {
            name:'bais',
            email:'bais@gmail.com',
            password:'mypass',
            entries:0,
            joined: new Date(),
            id:'124'
        },
        {
            name:'uzair',
            email:'uzair@gmail.com',
            password:'abumusal',
            entries:0,
            joined: new Date(),
            id:'123'
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
    database.users.push({
       name:name,
       password:password,
       email:email,
       entries:0,
       joined: new Date(),
       id:'125' 
    })

    res.json(database.users[database.users.length-1]);


})


app.get('/profile/:id',(req,res)=>{


    const {id}= req.params;
    let found = false;
    database.users.forEach((user)=>{
        if(user.id===id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(404).json('not found the user')
    }

})

app.put('/image',(req,res)=>{

    const {id}= req.body;
    let found = false;
    database.users.forEach((user)=>{
        if(user.id===id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json('not found the user')   
    }
})
// Routes that we have to add to over app
// profile route GET request '/profile/:userId'
//signin route POST request '/signin'
//register route POST request '/register'
// image checking route PUT request '/profile'




app.listen(3000,()=>{
    console.log('app is listening on port 3000...')

})