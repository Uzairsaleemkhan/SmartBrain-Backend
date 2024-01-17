const express = require("express");
const bodyParser= require('body-parser');
const app = express();
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.send("hello");
})

// Routes that we have to add to over app
// profile route GET request '/profile'
//signin route POST request '/signin'
//register route POST request '/register'
// image checking route PUT request '/profile'




app.listen(3000,()=>{
    console.log('app is listening on port 3000...')

})