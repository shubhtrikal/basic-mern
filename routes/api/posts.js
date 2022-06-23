const express = require('express');
const router = express.Router();
const validatePost = require('../../validation/post')
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const User = require('../../models/User')

const Post = require('../../models/Post')

router.get('/viewpost', async(req, res) => {
    try {
        const posts = await Post.find({status: 'verified'});
        res.status(200).json({posts : posts});
    }
    catch (err) {
        res.status(500).json({message: "internal server error"});
    }
})
router.post('/unverifiedpost', async(req, res) => {
    try {
        const decoded = jwt_decode(req.body.token)
        const user = await User.findOne({_id: decoded.id});
        if(!user || user.userType === 'user')
            return res.status(400).json({user : "unauthorized user"})
        const posts = await Post.find({status: 'unverified'});
        res.status(200).json({posts : posts});
    }
    catch (err) {
        res.status(500).json({message: "internal server error"});
    }
})

router.post('/createpost', async(req, res) => {
    const decoded = jwt_decode(req.body.token)
    const user = await User.findOne({_id: decoded.id});
    if(!user || user.userType === 'user')
        return res.status(400).json({user : "unauthorized user"})
    const {error, isValid} = validatePost(req.body.post)

    if(!isValid) {
        return res.status(400).json(error)
    }

    await Post.findOne({title: req.body.post.title})
        .then((post) => {
            if(post) {
                return res.status(400).json({title : "Post with same title already exists"})
            }
            else {
                const newPost = new Post(req.body.post)

                newPost
                    .save()
                    .then((post) => {
                        res.json(post)
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({server : "internal server error"})
        })
})

router.post('/verify', async(req, res) => {
    try {
        const decoded = jwt_decode(req.body.token)
        const user = await User.findOne({_id: decoded.id});
        if(!user || user.userType === 'user' || user.userType === 'admin')
            return res.status(400).json({user : "unauthorized user"})
        
        await Post.findByIdAndUpdate(req.body.post._id, {
            status : 'verified'
        }, {new : true})

        res.status(200).json("updatesStatus");
    } catch (error) {
        return res.status(500).json({server : "internal server error"})
    }
})

module.exports = router