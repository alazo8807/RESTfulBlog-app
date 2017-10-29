var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use( bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method")); 

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
 
 //CREATE Route
 app.post("/blogs", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body); 
     
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
    var id=req.params.id;
    Blog.findById(id,function(err, foundBlog){
       if(err){
           console.log('error aqui');
           res.redirect("/blogs");
       } else{
           console.log(foundBlog);
           res.render("show", {blog: foundBlog}); 
       }
    }); 
    
 });
 
 //EDIT Route
 app.get("/blogs/:id/edit", function(req,res){
    
    Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
          console.log("Error finding blog"); 
          res.redirect("/blogs/:id"); 
       
       } else{
          res.render("edit", { blog: foundBlog });  
       }
    });
 
 });
 
 //UPDATE Route
 app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body); 
    
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           console.log("Error updating blog");
           res.redirect("/blogs/" + req.params.id);
           
       } else{
           console.log('redirecting');
           res.redirect("/blogs/" + req.params.id);
           
       }
    });
     
 });
 
 //DELETE Route
 app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, deletedBlog){
       if(err){
           console.log("Error deleting blog");
           console.log(err);
        //   res.redirect("/blogs/" + req.params.id);
       }else{
           res.redirect("/blogs");
       }
        
    }); 
 });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server for blog is running");
});    
    