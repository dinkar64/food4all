const express = require('express');
const isAuth = require('../middlewares/isAuth');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { route } = require('./donation');
const router = express.Router();



router.get('/', isAuth, async (req, res, next) => {
    try {
        
        const posts = await Post.find({}).populate('authorId','avatar').limit(20);
        let postComments = [];
        let postavatars = [];
        for(var i=0;i<posts.length;i++){
            const comment = await Comment.findById(posts[i].commentId);
            postComments.push(comment); 
        }
       
        res.json({
            'posts': posts,
            'allcomments': postComments
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

})


router.post('/create', isAuth, async (req, res, next) => {
    try {
        console.log(req.body.post)
        const { post } = req.body;
        const p = new Post({ ...post, authorId: req.userId,liked:false });
        await p.save();
        
        await User.updateOne({_id:req.userId},{
            $push: {posts:p._id}
        })

        const c = new Comment({postId: p._id});
        const commentResult = await c.save();
        p.commentId = c._id;
        await p.save();
        const result = await Post.findById(p._id).populate('authorId','avatar');
        
        const user = await User.findById(req.userId)
        console.log(user)
        //console.log(result,commentResult)
        res.status(201).json({
            'post':result,
            'comment':commentResult
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

router.post('/like',isAuth, async(req,res,next)=>{
    try {
            console.log(req.body.value)
           await Post.updateOne({_id:req.body.id},{
               $inc: {noOfLikes:req.body.value},
               $push: {likes:req.id}
           })
           const post = await Post.find({authorId:req.body.authorId})

           console.log(post)
        res.json({
            'message': 'updated the like'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

})
module.exports = router