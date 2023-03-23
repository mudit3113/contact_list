const express = require('express');
const path = require('path');

const port =8000;

const db = require('./config/mongoose');


var Contact = require('./models/contact');

//fire up the express 
const app = express();

//setting up template engine 

// setting property of view engine and giving it a value of ejs for app
app.set('view engine', 'ejs');

// specify the path for the views folder 
app.set('views', path.join(__dirname,'views'));
// using _dirname makes it dynamic 

//app.use signifies the middleware && express.urlencoded takes the request and reads or analyses the data 
app.use(express.urlencoded());
app.use(express.static('assets'));


//middleware1
// app.use(function(req,res,next){
//     // console.log("mW1 called");
//     next();
// });

// // //middleware2 
// app.use(function(req,res,next){
//     // console.log("mW2 called");
//     next();
// });

var contactList = [
    {
        name:"Mudit",
        phone:"9818863113"
    },
    {
        name:"Prerit",
        phone:"9999272472"
    }
]

//rendering of file - i.e - sending data from server to view 
//creating key in json we use _ usually 
// camelCase in js 
app.get('/', function(req,res){

        Contact
        .find({})
        .then((data) =>{
            return res.render('home',{
                title: "Contacts List",
                contact_list: data
            });
        })
        .catch((err) => {
            console.log("error in fetching contacts from db");
            return;
        })

    
});



app.get('/practice', function (req,res){
    return res.render('practice', {
        title: "Let us play with EJS "
    } )  
});


// create a controller for the form that is being submitted 
app.post('/create-contact', function(req, res){
    //callback function is not working anymore in this version so use promises instead 
    Contact
        .create({
            name: req.body.name,
            phone:req.body.phone
        })
        .then((data)=> {
            console.log('*****', data);
            return;
        })
        .catch((err) => {
            console.log("error in creating a contact");
            return;
        })
    // contactList.push(req.body); 
    return res.redirect('/');

});

// creating a controller for deleting the contact 
app.get('/delete-contact', function(req,res){
    // craeting an id by getting the query from the url 
    let id= req.query.id;

    //find the contact in the DB using ID and delete
    Contact
    .findByIdAndDelete(id) 
    .then((data) => {
        console.log("***deleted****", data.name);
        return res.redirect('back');
    } )
    .catch((err) => {
        console.log("error in deleting an object from DB");
        return;
    });
    
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

});


//running the server 
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})
