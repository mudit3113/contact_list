const mongoose = require('mongoose');


//creating schema for contact 
var contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required: true
    }
});

// creating collection name 
var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

