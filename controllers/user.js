const express = require('express');
const app = express();
const  { hashSync, compareSync } = require ('bcrypt');
const User = require('../models/user');
const router = express.Router() ;
const jwt = require("jsonwebtoken");
const passport = require('passport');

router.use(express.json())
router.use(express.urlencoded({extended: true }))
router.use(passport.initialize());

require('../config/passport')



 
module.exports.create = async (req, res) => {

    let user = new User({
        email: req.body.email,
        password: hashSync(req.body.password, 10),
        //password: req.body.password,
        name: req.body.name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        creation_date: req.body.creation_date,
        role: req.body.role
    })

    try{
        const userToRegister =  await user.save();
        res.status(200).json(userToRegister)

    }

    catch(error){
        res.status(400).json({message : error.message})
    }
    
}

module.exports.login = (req, res)=>{
    User.findOne({name : req.body.name}).then(user=>{

        if(!user){

             return res.status(401).send({
                success : false,
                message:"could not find the user."
             })

            }
             if(!compareSync(req.body.password, user.password)){
                return res.status(401).send({
                    success : false,
                    message:"Wrong password."
             })

             }
             const payload={
                Usernamme : user.name,
                id: user._id

             }

             const token = jwt.sign(payload, "Random",{ expiresIn :"1d"} )

             return res.status(200).send({
                success : true,
                message:"logged in.",
                token :"bearer " + token
         })
    })
}


module.exports.UserList = async (req , res) => {
    try{
       const users =  await User.find();
       res.status(200).json(users)

   }
   catch(error){
       res.status(400).json({message : error.message})
   }
}

     
module.exports.deleteUserById = async (req ,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findByIdAndRemove(id) ;
       
        res.json({message : " the user has been deleted"})

    }
    catch(error){
        res.status(400).json({message : error.message})
    }

}
module.exports.UserById = async (req , res )=>{
   
    try{
        const id = req.params.id;
        const user =  await User.findById(id);
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }

}
module.exports.Update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    const user = new User({
      name:req.body.name,
      last_name:req.body.last_name,
      password:req.body.password,
      email:req.body.email,
      birth_date:req.body.birth_date,
      _id:id
    });
}
    




