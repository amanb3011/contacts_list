const mongoose = require('mongoose');

const contsactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

const Contact = mongoose.model('Contact',contsactSchema);
module.exports = Contact;


