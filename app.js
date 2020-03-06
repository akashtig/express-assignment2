const path = require('path');
const express = require('express');
const ejs = require('ejs');
const moment = require('moment');
const gallery = require('./gallery.js');
const app = express();
// console.log(gallery);
app.set('view engine','ejs');

app.use(function(req, res, next) {
  res.locals.year=moment().format('YYYY');
  res.locals.gallery = gallery;

  next();
});

app.use(express.urlencoded({ extended: false }));

app.get('/',function(req, res) {  
  res.render('index',{title: 'Home'});
});

app.get('/expenses',function(req, res) {  
  res.render('expenses',{title:'Expenses'});
});

app.get('/products',function(req, res) {  
  res.render('products',{title:'Products'});
});

app.get('/gallery',function(req, res) {  
  res.render('gallery',{title:'Gallery'});
});

app.get('/gallery/:id',function(req, res, next) {
  gallery.foreach(function() {
    if(this.id == req.params.id){
      res.render('galleryid',{title:`${req.params.id}`});
    }
  });  
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.status(404);
  res.send('404: File Not Found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});