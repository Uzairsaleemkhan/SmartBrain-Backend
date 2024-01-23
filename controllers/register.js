const handleRegister=(bcrypt,db)=>(req,res)=>{
    const {name, email, password}= req.body;
    if(!name||!email||!password){
        return res.status(400).json("Unable to register")
    }
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
}

module.exports = {
    handleRegister
}