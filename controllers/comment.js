const express = require ('express');
const Post = require('../models/post');
const Comment= require('../models/comment')
const router = express.Router() ;



// post comment
module.exports.create = async (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    const comment = new Comment ({
        titre: req.body.titre,
        text: req.body.text,
        like:req.body.like,
        comment:req.params.id,
        image:req.body.id
        
    })
    try{
        const commentToSave =  await comment.save();
        res.status(200).json(commentToSave)

    }
    catch(error){
        res.status(400).json({message : error.message})
    }
    };
    

// get All
module.exports.CommentList = async (req, res) => {
    try{
        const comments =  await Comment.find();
        res.status(200).json(comments)

    }
    catch(error){
        res.status(400).json({message : error.message})
    }
  };

// get by ID
  module.exports.CommentById = async (req, res) => {
   
    try{
        const comment =  await Comment.findById(req.params.id);
        res.status(200).json(comment)

    }
    catch(error){
        res.status(500).json({message : error.message})
    }
}



//update by id 
/*router.patch('/update/:id', async (req , res )=>{
    try{
        const id = req.params.id;
        const updatedPerson = req.body ;
        const options = { new : true };

        const result =  await Person.findByIdAndUpdate(id,updatedPerson, options)
        res.status(200).json(result)

    }
    catch(error){
        res.status(400).json({message : error.message})
    }
})*/

//delete by id 

module.exports.CommentDeleteById = async (req, res) => {
    try{
        const id = req.params.id;
        const comment = await Comment.findByIdAndRemove(id) ;
       
        res.json({message : " the comment has been deleted"})

    }
    catch(error){
        res.status(400).json({message : error.message})
    }
  
  };


