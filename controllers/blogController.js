const Blog = require('../models/blog');

//blog_index
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result})
        })
        .catch(err => console.log(err));
}

//blog_details
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: "Blog Details"});
        })
        .catch(err => {
            res.status(404).render('404', {title: 'Blog not found'})
        })
}

//blog_create_get
const blog_create_get = (req, res) => {
    res.render('create', { title: "create"});
}

//blog_create_post
const blog_create_post = (req, res) => {
    const newBlog = new Blog(req.body);
    newBlog.save()
        .then(result => {
            res.redirect('/blogs')
        })
        .catch(err => {
            console.log(err);
        })
}

//blog_delete
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id) //goes to the db and finds the blog by id & deletes
        .then(result => {
            res.json({ redirect: '/blogs' })
        })  
        .catch(err => console.log);
}
module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}