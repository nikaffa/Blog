//Keeps all route handler functions to keep the controller logic separately from the routes

const { request } = require('http');
const Blog = require('../models/blog');

//gets the blogs & injects them into index view
const blog_index = (request, response) => {
  Blog.find().sort({ createdAt: -1 }) //sorts blogs by date (-1 means in descending order)
   .then(result => {
     response.render('blogs/index', { title: 'All blogs', blogs: result }) 
   })
   .catch(err => console.log(err));
};

//gets a single blog with specific id
const blog_details = (request, response) => {
  const id = request.params.id; //get the id of a single request(single blog)
  Blog.findById(id) //retrieve doc with this id from the database
    .then(result => {
      response.render('blogs/details', { blog: result, title: 'Blog Details' }); //sends to the view a single blog with the id
    })
    .catch(err => {
      response.status(404).render('404', { title: 'Blog not found'}); //if blog with this id doesn't exist
    });
};

// 'get' request, sends back the actual form for creating a new blog
const blog_create_get = (request, response) => {
  response.render('blogs/create', { title: 'Create a new blog' }); 
};

// adds a new blog
const blog_create_post = (request, response) => {
  const blog = new Blog(request.body); //create new instance of blog with data from the body of request
  blog.save() //saves it to the database
    .then(result => {
      response.redirect('/blogs'); //redirect user to home page after submitting a blog
  })
    .catch(err => console.log(err));
};

// deletes a blog
const blog_delete = (request, response) => {
  const id = request.params.id; //finds in databese certain id of a request
  Blog.findByIdAndDelete(id) //finds and deletes thic doc from the database
  .then(result => { 
    response.json({ redirect: '/blogs' }) //sends to the browser json object as a response with redirect property
  })
  .catch(err => console.log(err));
};

//imports functions to other files to use them
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
}