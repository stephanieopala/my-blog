const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//creating a schema - defines the structure of our document
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

//create model - surrounds the schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;