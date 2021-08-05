const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//connect to the database
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1rycc.mongodb.net/node-course?retryWrites=true&w=majority`;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));

//register for view engine
app.set('view engine', 'ejs');


//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

//routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: "about"});
});

//blog routes
app.use('/blogs',blogRoutes)


//404
app.use((req, res) => {
    res.status(404).render('404', { title: "not found"});
});