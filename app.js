// Sends html page as a response to a browser, using npm Express module

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//creates instance of express app
const app = express();

//connects to mongo database
const dbURI = 'mongodb+srv://new_user:test123@nodecurse.d4zjx.mongodb.net/NodeCurse?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) //mongoose connects to the 'NodeCurse' database; 2nd argument is optional to prevent depricational warning
  .then(result => app.listen(3000)) //listen for requests to localhost:3000 after connection to db is completed, returns instance of server
  .catch(err => console.log(err));

//registers ejs as view engine to create templates
app.set('view engine', 'ejs');
app.set('views', 'newviews'); //optional 2nd argument: a path to new folder with views

//uses static midware that comes with express to keep static files (css, img, text, etc.) accessable from browser
app.use(express.static('public')); //folder name
//takes url encoded data and passes it into an object that we use on a request object
app.use(express.urlencoded({ extended: true }));
//uses morgan as midware function with option 'dev'
app.use(morgan('dev')); 


/*mongoose and mongo sandbox routes to interact with database:
//adds a blog to the collection
app.get('/add-blog', (req, res) => {
  //using Blog model, creates a new instance of blog doc and saves to blog collection
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'this is about my new blog',
    body: 'here comes my new interesting blog'
  });
  //saves it to the blogs collection
  blog.save()
    .then(result => res.send(result)) //sends back respond with the created object to the browser once blog was saved
    .catch(err => console.log(err));
});
//finds all the blogs
app.get('/all-blogs', (req, res) => {
  Blog.find() //using method 'find' on a model, finds all the docs in the collection
    .then(result => res.send(result)) //sends back response with the result to the browser
    .catch(err => console.log(err));
});
//finds a single blog
app.get('/single-blog', (req, res) => {
  Blog.findById('616b6b397a7d764e78f9c9dc') //finds a specific doc in the collection
    .then(result => res.send(result)) //sends back response with the result to the browser
    .catch(err => console.log(err));
});*/


//responds to a single GET request to a specific url and sends back a file to browser
//route: home
app.get('/', (equest, response) => {
  response.redirect('/blogs'); //redirects from home page to blog page
});
app.get('/', (request, response) => { //render is a ejs method to set back a response
  response.render('index', { title: 'Home' }); 
});

//route: about
app.get('/about', (request, response) => {
  response.render('about', { title: 'About' }); 
 });

//redirects
app.get('/about-us', (request, response) => {
  response.redirect('/about'); 
});

//imports blog routes which starts with '/blogs' and apply them to the app 
app.use('/blogs', blogRoutes);

//route: 404, 'use' middleware if nothing else matches
app.use((request, response) => {
  response.status(404).render('404', { title: '404' }); // adds 404 status code and sends back a file to browser
})
