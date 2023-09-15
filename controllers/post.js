const express = require ('express');
const Post = require('../models/post');
const Comment= require('../models/comment')
const router = express.Router() ;


// post posts

module.exports.create = async (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    const post = new Post ({
        titre: req.body.titre,
        text: req.body.text,
        like:req.body.like,
        comment:req.params.id,
        image:req.body.id
    
    })
    try{
        const postToSave =  await post.save();
        res.status(200).json(postToSave)
    
    }
    catch(error){
        res.status(400).json({message : error.message})
    }
    };
    
// get All
module.exports.PostList = async (req, res) => {
    try{
         const posts =  await Post.find();
         res.status(200).json(posts)

    }
    catch(error){
         res.status(400).json({message : error.message})
    }
}
// get by ID

module.exports.PostById = async (req , res )=>{
   
    try{
        const post =  await Post.findById(req.params.id);
        res.status(200).json(post)

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
module.exports.DeletePostById = async (req ,res)=>{
    try{
        const id = req.params.id;
        const post = await Post.findByIdAndRemove(id) ;
       
        res.json({message : " the post has been deleted"})

    }
    catch(error){
        res.status(400).json({message : error.message})
    }
}



