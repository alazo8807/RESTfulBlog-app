var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser");

mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use( bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type:Date, default: Date.now()}
});

var Blog = mongoose.model("blog", blogSchema);

// Blog.create({
//     title: "Blog1",
//     image: "https://farm5.staticflickr.com/4062/4667266519_2a976d9a92.jpg",
//     body: "Here would go a description of the blog, but I am tired today ;P"
//  }, function(err, newBlog){
//   if(err){
//       console.log(err);
//       console.log("Error adding blog");
//   } else{
//       console.log("Blog " + newBlog.title + " Added");
//   } 
// });

app.get("/", function(req, res){
    
    res.redirect("/blogs")   
    
 });
 
 //INDEX Route
 app.get("/blogs", function(req, res){
    
    Blog.find({}, function(err, foundBlogs){
       if(err){
          console.log(err);
          console.log("Error retrieving blogs");
          
       } else{
          res.render("index", {blogs: foundBlogs})  
       }
    });
    
 });
 
 //NEW Route
 app.get("/blogs/new", function(req, res){
    res.render("new"); 
 });
 
 //POST Route
 app.post("/blogs", function(req,res){
    var newBlog = req.body.blog;
    if(newBlog){
        
        Blog.create(newBlog, function(err, newBlog){
            if(err){
                console.log("Error adding new blog");
            }else{
                res.redirect("/blogs");
            }
        });
    
    } else{
        console.log("error from post");
    }
    
 });
 
 //SHOW Route
 app.get("/blogs/:id", function(req, res) {
    res.render("show"); 
 });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server for blog is running");
});    
    