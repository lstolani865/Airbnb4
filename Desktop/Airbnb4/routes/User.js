const express = require('express')
const router = express.Router();
const bcrypt= require("bcryptjs");
const hasAccess= require("../middleware/auth");
const isAdmin = require("../middleware/typeCheck")
//This allows you to perform  Create, Read, Update and Delete operations on the User colections 
const regForms = require("../models/User"); 
//const hasAccess = require("../middleware/auth");

//Route to direct user to Registration form
router.get("/userRegistration",(req,res)=>{
    res.render("User/userRegistration")
  });
  
  router.post("/userRegistration",(req,res)=>{
  
  
   
      const regErrors=[];
      const regExPass=/[0-9a-zA-Z]$/;
      const regExName=/[a-zA-Z]{2-40}/;
      
       if(req.body.email == "")
       {
           regErrors.push("Please enter an email address")
     }
  
      if(req.body.firstName == "")
      {
          regErrors.push("Please enter your First Name")
      }
  
      if((req.body.firstName !== "")&&(regExName.test(req.body.firstName))){
          regErrors.push("A FirstName should contain only letters")
      }
  
  
      if(req.body.lastName == "")
      {
          regErrors.push("Please enter your Last Name")
      }
  
      if((req.body.lastName !== "")&&(regExName.test(req.body.lastName))){
           regErrors.push("A LastName should contain only letters")
      }
  
      if(req.body.password == "")
      {
          regErrors.push("Please enter a Password")
      }
  
      if((req.body.password != "") &&(req.body.password.length < 6 || req.body.password.length > 12)){
          regErrors.push("Password should be included between 8 to 16 characters.") 
      }
      if((req.body.password != "")&&(req.body.password.match(regExPass))){
            regErrors.push("Enter a password with letter and digit only") 
       }

   // if(req.body.password != confirm_password){
         // regErrors.push("Password does not match.") 
     //}
      if(req.body.month =="Month" ){
          regErrors.push("Please enter a valid Date(Month)")
      }
  
      if(req.body.year =="Year" ){
          regErrors.push("Please enter a valid Date(Year)")
      }
  
      if(req.body.day =="Day" ){
          regErrors.push("Please enter a valid Date(Day)")
      }
      
      if(regErrors.length > 0 )
      {
             res.render("User/userRegistration",{
             message:regErrors
           })
          
        
      }
      else
    {
    
    const regFormData ={
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        month:req.body.month,
        day:req.body.day,
        year:req.body.year
    }
    //To create a form document we have to call the Model constructor
    const form = new regForms(regFormData);
    form.save()
    .then(() => 
    {
        console.log('Successful Insertion')
       // res.redirect("/User/logIn");
    
    })
    .catch((err)=>{
        console.log(`errors!!! ${err}`)
    })

     //send the Email

  const nodemailer = require('nodemailer');
  const sgTransport = require('nodemailer-sendgrid-transport');

       const options = {
          auth: {
              api_key: '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'
          }
      }

      const mailer = nodemailer.createTransport(sgTransport(options));

      const email = {
          to: `${req.body.email}`,
          from: 'lavinatolani248@gmail.com',
          subject: 'Testing',
          text: "You have been successfully registered.",
          html: "You have been successfully registered."
      };
       
      mailer.sendMail(email, (err, res)=> {
          if (err) { 
              console.log(err) 
          }
          console.log(res);
      });

          res.redirect("/User/logIn");
       }
     });


     //The below route handler is called to dispay the FORM page
router.get("/logIn",(req,res)=>{
    res.render("User/logIn")
  });

  //The below route handles is called to process the form when submitted!!
router.post("/logIn",(req,res)=>{

  //This is my server side validation
  const errors = [];

  if(req.body.email==""){
    errors.push("Please enter the username")
  }
  if (req.body.password==""){
    errors.push("Please enter the password")
  }
  if (errors.length>0){
    res.render("User/logIn",{
      message:errors
    })
  }

  else{ 
    const formData = {
        email : req.body.email,
        password : req.body.password
    }

    regForms.findOne({email:formData.email})
    .then(form=>{

        //This means that there was no matching email in the database
        if(form==null)
        {
            errors.push("Sorry your email was not found");
            res.render("User/logIn",{
                message: errors
            })
        }

         //This reprsents that the email exists
         else
         {
             bcrypt.compare(formData.password,form.password)
             .then(isMatched=>{
 
                 if(isMatched==true)
                 {
                     //It means that the user is authenticated 
 
                     //Create session 
                     req.session.userInfo=form;

                     if (req.session.userInfo.type=="Admin"){

                        req.session.admin = "yes"
                         res.redirect("/User/adminDashboard");
                     }
                     else{
                         res.redirect("/User/userDashboard")
                     }
                     
                    }
    
                 else
                 {
                     errors.push("Sorry, your password does not match");
                     res.render("User/logIn",{
                         message:errors
                     })
                 }
 
             })
 
             .catch(err=>console.log(`Error :${err}`));
         }
     })
     .catch(err=> console.log(`Something occured ${err}`));
 
    }
 
 });

 router.get("/logout",(req,res)=>{

    //This destorys the session
    req.session.destroy();
    res.redirect("/User/logIn");

});

    
    
router.get("/userDashboard",hasAccess,(req,res)=>
{
  res.render("User/userDashboard");
});
    
router.get("/adminDashboard",hasAccess,isAdmin,(req,res)=>
{
  res.render("User/adminDashboard");
});


router.get("/logout",(req,res)=>{

    //This destorys the session
    req.session.destroy();
    res.redirect("/user/logIn");

});

//Route to process user's request and data when user submits registration form
router.post("/register",(req,res)=>
{

    //validation
    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName ,
        email : req.body.email,
        password : req.body.password
    }

    const errors= [];

    //Test to see if user did not upload file
    if(req.files==null)
    {
        errors.push("Sorry you must upload a file")
    }   

    //User uploaded file
    else
    {       //file is not an image
            if(req.files.profilePic.mimetype.indexOf("image")==-1)
            {
                errors.push("Sorry you can only upload images : Example (jpg,gif, png) ")
            }
    }


    //Has errors
    if(errors.length > 0)
    {
        res.render("User/userRegisteration",{
            errors:errors,
            firstName :newUser.firstName,
            lastName : newUser.lastName,
            email : newUser.email
        })
    }

    else 
    {

        const user = new User(newUser);
        //create  new user
        user.save()
        .then(user=>{
    
           
            //rename file to include the userid
            req.files.profilePic.name = `db_{lavina_2710}{path.parse(req.files.profilePic.name).ext}`
            
            //upload file to server
            req.files.profilePic.mv(`public/uploads/${req.files.profilePic.name}`)
            .then(()=>{

                //Then is needed to refer to associate the uploaded image to the user
                User.findByIdAndUpdate(user._id,{
                    profilePic:req.files.profilePic.name 
                })
                .then(()=>{
                    console.log(`File name was updated in the database`)
                    res.redirect("/user/login");  
                })
                .catch(err=>console.log(`Error :${err}`));
                
                 
            });

        })
        .catch(err=>console.log(`Error :${err}`));

    }

});




   
     
module.exports=router;

  
