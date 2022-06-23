const mongoose = require("mongoose");

const Schema = mongoose.Schema

const postSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ['verified' , 'unverified'],
        default : 'unverified',
    },
    date : {
        type : Date,
        default: Date.now,
    },
})

module.exports = Post = mongoose.model('Post', postSchema)