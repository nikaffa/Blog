// Interacts with database
// Creates blogs in Mongo database using mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema; //schema describes the scructure of blogs in blog collections

//creates new schema instance
const blogSchema = new Schema({
  title: {
    type: String,
    required: true // means this is required for a blog
  },
  snippet: {
    type: String,
    required: true 
  }, 
  body: {
    type: String,
    required: true 
  }
}, {timestamps: true}); //optional 2nd argument- timestamp

//creates a model based on a schema (what type of object it should be), which looks to collection named 'blogs'
const Blog = mongoose.model('Blog', blogSchema);
//exports model to use it in project
module.exports = Blog; 

