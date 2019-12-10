
const PORT = process.env.PORT || 8080;
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileupload = require("express-fileupload");
const session = require("express-session");
//Creation of app object
const app= express();
const express = require('express');
const multer = require('multer');
const upload = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
}); 

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('file-to-upload'), (req, res) => {
  res.redirect('/');
});

app.listen(3000);

//This loads all our environment variables from the keys.env
require("dotenv").config({path:'./config/keys.env'});



//Import your router objects
const generalRoutes = require("./routes/General");
const userRoutes = require("./routes/User");
const roomRoutes = require("./routes/Room");

app.use(bodyParser.urlencoded({ extended: false }));

//This is how you map your file upload to express
app.use(fileupload())

app.use(express.static('public'))


app.use(session({ secret: 'This is my secret key and this cannot be shared with anyone!', resave: true, saveUninitialized: true }));



app.use((req,res,next)=>{

    //This is a global variable that can be accessed by templates
    res.locals.user= req.session.userInfo;
    res.locals.admin= req.session.admin;
    next();
})


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//MAPs EXPRESS TO ALL OUR  ROUTER OBJECTS
app.use("/",generalRoutes);
app.use("/user",userRoutes);
app.use("/room",roomRoutes);

app.use("/",(req,res)=>{
    res.render("General/404");
});

//This code is used to connect mongoose to our MONGODB in the Cloud
const MONGO_DB_URL= "mongodb+srv://lavina_2710:Srichand106!@cluster0-rrc0z.mongodb.net/AIRBNB4?retryWrites=true&w=majority"

//const MONGO_DB_URL=`mongodb+srv://{process.env.lavina_2710}:{process.env.Srichand106!}@cluster0-agoxt.mongodb.net/{process.env.AIRBNB4}?retryWrites=true&w=majority`;
 
mongoose.connect(MONGO_DB_URL, {useUnifiedTopology: true,useNewUrlParser: true})
//The then block will only be executed if the above-mentioned line is successful
.then(()=>{
    console.log(`The Database is successfully connected`)
})
//The catch block will only be executed if the connection failed
.catch(err=>{
    console.log(`Hmm!!! Something seems wrong : ${err}`);
})

app.listen(PORT,()=>{
  console.log(`The Web Server is connected at port ${PORT}`);
});