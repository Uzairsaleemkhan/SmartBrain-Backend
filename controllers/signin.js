const handleSignin =(db,bcrypt) => (req,res) => {
    const {email,password} = req.body;
    if(!email||!password){
     return res.status(400).json("Invalid credentials");
    }
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
 
 }
 module.exports = {
    handleSignin
 }