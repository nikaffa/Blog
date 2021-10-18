//All blog routes

const express = require('express');
const blogController = require('../controller/blogController')
const router = express.Router(); //creates a new instance of a router object

//extracts blog_index func from blogController file
router.get('/', blogController.blog_index); 

//adds new blog to the browser by handling POST request
router.post('/', blogController.blog_create_post);

//route:create blog
router.get('/create', blogController.blog_create_get);

//extract id parameter for request handler
router.get('/:id', blogController.blog_details);

//handle a delete request
router.delete('/:id', blogController.blog_delete);

//exports the router
module.exports = router;
