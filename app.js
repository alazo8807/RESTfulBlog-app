var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser");

mongoose.connect("mongodb://localhost/restful_blog_app", {useMongoClient: true});
app.set("engine view", 'ejs');
app.use(express.static('public'));
app.use( bodyParser.urlencoded({extended: true}));

var blogSchema = mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type:Date, default: Date.now()}
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server for blog is running");
});    
    