const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:String,
    content:String
},{collection:"blog"})

const dbModel = mongoose.model("blog",blogSchema)
module.exports = dbModel