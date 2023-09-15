const express = require('express');
const router = express.Router();
const comment= require ('../controllers/comment')


router.post('/add', comment.create);
router.get('/getALL', comment.CommentList);
router.get('/getone/:id', comment.CommentById);
router.delete('/delete/:id', comment.CommentDeleteById);

module.exports = router;