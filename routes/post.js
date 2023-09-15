const express = require('express');
const router = express.Router();
const post= require ('../controllers/post');


router.post('/add', post.create);
router.get('/getALL', post.PostList);
router.get('/getone/:id', post.PostById);
router.delete('/delete/:id', post.DeletePostById);

module.exports = router;