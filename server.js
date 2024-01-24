const express = require("express");
const bodyParser= require('body-parser');
const cors= require('cors');
const app = express();
const bcrypt = require('bcrypt');
const registerController = require('./controllers/register');
const profileController = require('./controllers/profile');
const imageController = require('./controllers/image');
const signInController = require('./controllers/signin');
const db = require('knex')({
    client:'pg',
    connection:{
        host:'dpg-cmol9jun7f5s73d6440g-a.oregon-postgres.render.com',
        user:'uzair',
        password:'TNRlFj5q01jMfZtL1dbHGuwWgPxD4Rdv',
        database:'smartbrain_gg8f'
    }
});
const corsOptions ={
    origin :'https://smartbrainapp-7qdz.onrender.com/'
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
// SIGNIN END POINT
app.post('/signin',signInController.handleSignin(db,bcrypt));
// REGISTER END POINT
app.post('/register',registerController.handleRegister(bcrypt,db));
// PROFILE ENDPOINT
app.get('/profile/:id',profileController.getProfile(db))
// IMAGE ENDPOINT
app.put('/image',imageController.handleImage(db));
app.post('/detectimage',imageController.detectImage);

// Routes that we have to add to over app
// profile route GET request '/profile/:userId'
//signin route POST request '/signin'
//register route POST request '/register'
// image checking route PUT request '/profile'




app.listen(process.env?.PORT||3000,()=>{
    console.log('app is listening on port 3000...')
    
})
//“People think focus means saying yes to the thing you’ve got to focus on. But that’s not what it means at //all. It means saying no to the hundred other good ideas that there are. You have to pick carefully.” 