const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { forEach } = require("lodash");
const e = require("express");
const app = express();
const _ = require('lodash');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Email  : Sandeepthadiparthi@gmail.com";
let posts = [];

app.get("/",function(req,res){
    res.render("home",{
      homeContent:homeStartingContent,
      posts:posts
    
    });
});
  


app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});


app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/posts/:text",function(req,res){
  let requestedTitle = req.params.text;
  let str1 = _.lowerCase(requestedTitle);

  posts.forEach(function(post) {
    let str2 = _.lowerCase(post.title);
    if( str1 === str2){
      console.log("Match Found");
      res.render("post",{postTitle:post.title,cont:post.content});
    }
  
  })
  
});


app.get("/compose",function(req,res){
  res.render("compose");
});
app.post("/compose",function(req,res){
  let postBody = req.body.postBody;
  let postTitle = req.body.postTitle;
  const post = {
    title:postTitle,
    content:postBody
  }
  posts.push(post);
  res.redirect("/");
  
  
})









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
